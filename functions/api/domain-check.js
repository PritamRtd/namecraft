export async function onRequest(context) {
  const { request, env } = context;

  // Handle CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  const accountId = env?.CLOUDFLARE_ACCOUNT_ID;
  const apiToken = env?.CLOUDFLARE_API_TOKEN;

  if (!accountId || !apiToken) {
    return new Response(JSON.stringify({
      success: false,
      errors: [{ message: 'Cloudflare credentials (CLOUDFLARE_ACCOUNT_ID, CLOUDFLARE_API_TOKEN) not configured.' }]
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  let domains = [];
  if (request.method === 'POST') {
    try {
      const body = await request.json();
      if (Array.isArray(body.domains)) {
        domains = body.domains;
      } else if (typeof body.domain === 'string') {
        domains = [body.domain];
      }
    } catch (e) {
      return new Response(JSON.stringify({ success: false, errors: [{ message: 'Invalid JSON body' }] }), {
        status: 400,
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
      });
    }
  } else {
    const url = new URL(request.url);
    const q = url.searchParams.get('domains') || url.searchParams.get('domain') || url.searchParams.get('q');
    if (q) {
      domains = q.split(',').map(d => d.trim()).filter(Boolean);
    }
  }

  if (!domains.length) {
    return new Response(JSON.stringify({ success: false, errors: [{ message: 'No domains provided' }] }), {
      status: 400,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }

  try {
    const cfRes = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${accountId}/registrar/domain-check`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ domains }),
      }
    );

    const data = await cfRes.json();
    return new Response(JSON.stringify(data), {
      status: cfRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ success: false, errors: [{ message: err.message }] }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    });
  }
}

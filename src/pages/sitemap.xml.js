const EXTERNAL_DATA_URL = process.env.NEXT_PUBLIC_API_LINK;

function generateSiteMap(doors) {
    return `<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            <url>
                <loc>https://portaldoorsstore.ru</loc>
            </url>
            <url>
                <loc>https://portaldoorsstore.ru/doors</loc>
            </url>
            ${doors.map(({ _id }) => { return `
                <url>
                    <loc>${`${EXTERNAL_DATA_URL}/doors/${_id}`}</loc>
                </url>`;
            }).join('')}
        </urlset>`;
}

function SiteMap() {};

export async function getServerSideProps({ res }) {
    const request = await fetch(`${EXTERNAL_DATA_URL}/api/doors/all`);
    const doors = await request.json();
    const sitemap = generateSiteMap(doors);

    res.setHeader('Content-Type', 'text/xml');
    res.write(sitemap);
    res.end();

    return {
        props: {},
    };
};

export default SiteMap;

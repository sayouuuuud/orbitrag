-- orbitrag · default content. Idempotent: won't overwrite admin edits.
insert into public.site_content (key, value, label, kind, section, sort_order) values
  -- hero
  ('domain',              'orbitrag.com',                                                 'Domain',                 'text',     'hero', 10),
  ('price',               '$400 USD',                                                     'Price',                  'text',     'hero', 20),
  ('price_note',          'Offers from $320 considered',                                  'Price note',             'text',     'hero', 30),
  ('hero_eyebrow',        'PRIVATE LISTING · ONE-TIME ACQUISITION',                       'Hero eyebrow',           'text',     'hero', 40),
  ('hero_description',    'A short, brandable .com built for the retrieval-augmented era. Sold once. Transferred instantly. Offered now as a private listing.', 'Hero description', 'textarea', 'hero', 50),

  -- CTAs
  ('primary_cta_label',   'Acquire This Domain',                                          'Primary button label',   'text',     'cta',  10),
  ('primary_cta_url',     'https://www.atom.com/name/orbitrag',                           'Primary button link',    'url',      'cta',  20),
  ('secondary_cta_label', 'Contact Owner',                                                'Secondary button label', 'text',     'cta',  30),
  ('contact_email',       'owner@orbitrag.com',                                           'Contact email',          'email',    'cta',  40),

  -- marketplace badge
  ('marketplace_name',    'Atom',                                                         'Marketplace name',       'text',     'cta',  50),

  -- thesis
  ('thesis_title',        'A name that already means something.',                         'Thesis title',           'text',     'thesis', 10),
  ('thesis_body',         'Orbit + RAG. The act of pulling context into orbit around a query. Eight characters. Three syllables. No hyphens. Reads like a product, not a portfolio.', 'Thesis body', 'textarea', 'thesis', 20),

  -- footer
  ('footer_tagline',      'A rare .com for the retrieval era.',                           'Footer tagline',         'text',     'footer', 10),
  ('footer_credit',       'Listed privately, 2026.',                                      'Footer credit',          'text',     'footer', 20)
on conflict (key) do nothing;

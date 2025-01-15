<?php
return [
  // Global settings
  // Settings documentation: https://github.com/vaersaagod/seomate/blob/master/README.md
  '*' => [
    'defaultProfile' => 'standard',

    'defaultMeta' => [
      'title' => ['title'],
      'description' => ['seoSettings.seoDescription'],
      'image' => ['seoSettings.seoImage'],
      'robots' => ['all'],
    ],

    'fieldProfiles' => [
      'standard' => [
        'title' => ['seoTitle', 'title'],
        'description' => ['seoDescription'],
        'image' => ['seoImage', 'headerImage'],
        'robots' => ['seoRobots'],
      ],
      // Define multiple profiles
      // 'newsProfile' => [
      //   'title' => ['seoTitle', 'title'],
      //   'description' => ['seoDescription', 'shortDescription'],
      //   'image' => ['seoImage', 'featuredImage'],
      //   'robots' => ['seoRobots'],
      // ],
    ],

    // Assign profile 
    // 'profileMap' => [
    //   'libraryNews' => 'newsProfile',
    // ],

    'additionalMeta' => [
      'referrer' => 'no-referrer-when-downgrade',
      'og:type' => 'website',
      'twitter:card' => 'summary_large_image',
    ],

    'sitemapConfig' => [
      'elements' => [
        'pages' => [
          'elementType' => \craft\elements\Entry::class,
          'criteria' => [
            'section' => [
              'pages'
            ],
            'type' => [
              'defaultContent',
              'indexPage'
            ]
          ],
          'params' => ['changefreq' => 'weekly', 'priority' => 0.5],
        ],
      ],
    ],
  ],

  // Dev environment settings
  'dev' => [
    'cacheEnabled' => false,
    'sitemapEnabled' => false,
  ],

  // Staging environment settings
  'staging' => [
    'cacheEnabled' => false,
    'sitemapEnabled' => false,
  ],

  // Production environment settings
  'production' => [
    'cacheEnabled' => true,
    'cacheDuration' => 86400,
    'sitemapEnabled' => true,
  ],
];

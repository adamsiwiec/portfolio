const config = require('./src/config');

module.exports = {
  siteMetadata: {
    title: 'Adam Siwiec | Software Engineer | Web Developer',
    description:
      'Adam Siwiec is a software engineer specializing in building artificial intelligence, blockchain, and cloud products. He studies computer science at Stanford University and works as a software engineer at Nvidia.',
    siteUrl: 'https://siwiec.us', // No trailing slash allowed!
    image: '/og.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@asiwiec1',
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-ghost`,
      options: {
        apiUrl: `https://blog.siwiec.us/blog`,
        contentApiKey: `4439e5f61cd3af27c42f716310`,
        version: `v5.0`, // Ghost API version, optional, defaults to "v5.0".
        // Pass in "v4.0" if your Ghost install is not on 5.0 yet!!!
      },
    },
    {
      resolve: `gatsby-plugin-advanced-sitemap`,
      options: {
        // 1 query for each data type
        query: `
          {
              allGhostPost {
                  edges {
                      node {
                          id
                          slug
                          updated_at
                          feature_image
                      }
                  }
              }
              allGhostPage {
                  edges {
                      node {
                          id
                          slug
                          updated_at
                          feature_image
                      }
                  }
              }
              allGhostTag {
                  edges {
                      node {
                          id
                          slug
                          feature_image
                      }
                  }
              }
              allGhostAuthor {
                  edges {
                      node {
                          id
                          slug
                          profile_image
                      }
                  }
              }
          }`,
        // The filepath and name to Index Sitemap. Defaults to '/sitemap.xml'.
        output: '/sitemap.xml',
        mapping: {
          // Each data type can be mapped to a predefined sitemap
          // Routes can be grouped in one of: posts, tags, authors, pages, or a custom name
          // The default sitemap - if none is passed - will be pages
          allGhostPost: {
            sitemap: `posts`,
            // Add a query level prefix to slugs, Don't get confused with global path prefix from Gatsby
            // This will add a prefix to this particular sitemap only
            prefix: 'blog/',
            // Custom Serializer
          },
          allGhostTag: {
            sitemap: `tags`,
          },
          allGhostAuthor: {
            sitemap: `authors`,
          },
          allGhostPage: {
            sitemap: `pages`,
          },
        },
        exclude: [
          `/dev-404-page`,
          `/404`,
          `/404.html`,
          `/offline-plugin-app-shell-fallback`,
          `/my-excluded-page`,
          /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
        ],
        createLinkInHead: true, // optional: create a link in the `<head>` of your site
        addUncaughtPages: true, // optional: will fill up pages that are not caught by queries and mapping and list them under `sitemap-pages.xml`
        // additionalSitemaps: [
        //   // optional: add additional sitemaps, which are e. g. generated somewhere else, but need to be indexed for this domain
        //   {
        //     name: `blog`,
        //     url: `https://siwiec.us/blog/sitemap.xml`,
        //   },
        // ],
      },
    },
    {
      resolve: `gatsby-plugin-s3`,
      options: {
        bucketName: 'siwiec.us',
      },
    },
    {
      resolve: 'gatsby-plugin-merge-robots',
      options: {
        host: 'https://siwiec.us',
        sitemap: 'https://siwiec.us/sitemap.xml',
        policy: [
          {
            userAgent: '*',
            disallow: ['/cdn-cgi/l/email-protection'],
          },
        ],
        external: ['https://siwiec.us/blog/robots.txt'],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'AdamSiwiec',
        short_name: 'AdamSiwiec',
        start_url: '/',
        background_color: config.colors.darkNavy,
        theme_color: config.colors.navy,
        display: 'minimal-ui',
        icon: 'src/images/logo.png',
      },
    },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'content',
        path: `${__dirname}/content/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/content/posts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `projects`,
        path: `${__dirname}/content/projects`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-external-links
            resolve: 'gatsby-remark-external-links',
            options: {
              target: '_blank',
              rel: 'nofollow noopener noreferrer',
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-images
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 700,
              linkImagesToOriginal: true,
              quality: 90,
              tracedSVG: { color: config.colors.green },
            },
          },
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-code-titles/
            resolve: 'gatsby-remark-code-titles',
          }, // IMPORTANT: this must be ahead of other plugins that use code blocks
          {
            // https://www.gatsbyjs.org/packages/gatsby-remark-prismjs
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (e.g. <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (e.g. for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: 'language-',
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
              // This toggles the display of line numbers globally alongside the code.
              // To use it, add the following line in gatsby-browser.js
              // right after importing the prism color scheme:
              //  require("prismjs/plugins/line-numbers/prism-line-numbers.css")
              // Defaults to false.
              // If you wish to only show line numbers on certain code blocks,
              // leave false and use the {numberLines: true} syntax below
              showLineNumbers: false,
              // If setting this to true, the parser won't handle and highlight inline
              // code used in markdown i.e. single backtick code like `this`.
              noInlineHighlight: false,
              // This adds a new language definition to Prism or extend an already
              // existing language definition. More details on this option can be
              // found under the header "Add new language definition or extend an
              // existing language" below.
              languageExtensions: [
                {
                  language: 'superscript',
                  extend: 'javascript',
                  definition: {
                    superscript_types: /(SuperType)/,
                  },
                  insertBefore: {
                    function: {
                      superscript_keywords: /(superif|superelse)/,
                    },
                  },
                },
              ],
              // Customize the prompt used in shell output
              // Values below are default
              prompt: {
                user: 'root',
                host: 'localhost',
                global: false,
              },
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-45666519-2',
      },
    },
  ],
};

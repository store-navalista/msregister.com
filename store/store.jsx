let store = {
   language: 'en',
   info: {
      text: 'Call us',
      phone: '+44 (744) 992-05-35',
      facebook: 'https://www.facebook.com/Mediterranean-Shipping-Register-1685012711780346/',
      linkedin: '/'
   },
   headerPages: [
      {
         id: 1,
         title: 'Home',
         href: '/',
         seo: {
            description: 'Management. Survey. Registration.',
            pageTitle: 'Home page',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 2,
         title: 'About Us',
         href: '/about',
         seo: {
            description: 'Management. Survey. Registration.',
            pageTitle: 'About us',
            siteTitle: 'Mediterranean Shipping Register'
         },
         tip: 'About MSR',
         background: '/img/about_bg.jpg',
         pages: [
            {
               id: 1,
               title: 'About Our Mission',
               href: '/about/mission',
               seo: {
                  description: 'About Our Mission.',
                  pageTitle: 'Our Mission',
                  siteTitle: 'Mediterranean Shipping Register'
               },
               tip: 'Our Mission, Vision, Values & Goals',
               background: '/img/mission_bg.jpg'
            },
            {
               id: 2,
               title: 'About Our Policy',
               href: '/about/policy',
               seo: {
                  description: 'About Our Policy.',
                  pageTitle: 'Our Policy',
                  siteTitle: 'Mediterranean Shipping Register'
               },
               tip: 'Our Corporate Policy',
               background: '/img/policy_bg.jpg'
            },
            {
               id: 3,
               title: 'About Our Geography',
               href: '/about/geography',
               seo: {
                  description: 'About Our Geography.',
                  pageTitle: 'Our Geography Services',
                  siteTitle: 'Mediterranean Shipping Register'
               },
               tip: 'Our Geography of Services',
               background: '/img/geography_bg.jpg'
            }
         ]
      },
      {
         id: 3,
         title: 'Contact',
         href: '/contact',
         seo: {
            description: 'Management. Survey. Registration.',
            pageTitle: 'Contact',
            siteTitle: 'Mediterranean Shipping Register'
         }
      }
   ],
   asidePagesTitle: 'Our services',
   asidePages: [
      {
         id: 1,
         title: 'Classification Services',
         href: '/services/classification-services',
         seo: {
            description: 'Classification Services.',
            pageTitle: 'Classification Services',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 2,
         title: 'Statutory Surveys and Other Services',
         href: '/services/statutory-surveys-and-other-services',
         seo: {
            description: 'Statutory Surveys and Other Services.',
            pageTitle: 'Statutory Surveys and Other Services',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 3,
         title: 'Surveys',
         href: '/services/surveys',
         seo: {
            description: 'Surveys.',
            pageTitle: 'Surveys',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 4,
         title: 'Technical Supervision at Shipyard',
         href: '/services/technical-supervision-at-shipyard',
         seo: {
            description: 'Technical Supervision at Shipyard.',
            pageTitle: 'Technical Supervision at Shipyard',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 5,
         title: 'Technical Supervision in Industry',
         href: '/services/technical-supervision-in-industry',
         seo: {
            description: 'Technical Supervision in Industry.',
            pageTitle: 'Technical Supervision in Industry',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 6,
         title: 'Towage',
         href: '/services/towage',
         seo: {
            description: 'Towage.',
            pageTitle: 'Towage',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 7,
         title: 'Certification',
         href: '/services/certification',
         seo: {
            description: 'Certification.',
            pageTitle: 'Certification',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 8,
         title: 'Advisory & Consulting',
         href: '/services/advisory-and-consulting',
         seo: {
            description: 'Advisory & Consulting.',
            pageTitle: 'Advisory & Consulting',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 9,
         title: 'Useful Information',
         href: '/services/information',
         seo: {
            description: 'Useful Information',
            pageTitle: 'Information',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 10,
         title: 'Client support',
         href: '/for-clients',
         seo: {
            description: 'Client support.',
            pageTitle: 'Client support',
            siteTitle: 'Mediterranean Shipping Register'
         }
      },
      {
         id: 11,
         title: 'News',
         href: '/news',
         seo: {
            description:
               'Stay up to date with the latest news and achievements of Mediterranean Shipping Register. Discover our innovations, international projects, and contributions to the development of the maritime industry.',
            pageTitle: 'News',
            siteTitle: 'Mediterranean Shipping Register'
         }
      }
   ],

   toggleLanguage(e) {
      switch (this.language) {
         case 'en':
            for (let lang of e.target.parentNode.querySelectorAll('img[data-id]')) {
               lang.style.transform = 'translateX(24px)'
            }
            this.language = 'ru'
            break
         case 'ru':
            for (let lang of e.target.parentNode.querySelectorAll('img[data-id]')) {
               lang.style.transform = 'translateX(0)'
            }
            this.language = 'en'
            break
         default:
            this.language = 'en'
      }
   }
}

export default store

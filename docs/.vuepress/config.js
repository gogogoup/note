module.exports = {
  title: 'Document',
  description: 'Note',
  themeConfig: {
    nav: [
      { 
        text: 'Home', 
        link: '/' 
      },
      { 
        text: 'DailyShare', 
        link: '/DailyShare/'
      },
      { 
        text: 'Github', 
        link: 'https://github.com/gogogoup' 
      },
    ],
    sidebar: {
      '/DailyShare/': [
        '2019.6.19',
        '2019.6.18',
      ],
      '/': [
        'homePage1'
      ],
    },
    // sidebar: "auto",
    lastUpdated: 'Last Updated',
  },
  base: "note"
}
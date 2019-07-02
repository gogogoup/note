module.exports = {
  title: 'DooooonFun',
  description: "",
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
        text: 'Writting',
        link: '/Writting/'
      },
      { 
        text: 'Github', 
        link: 'https://github.com/gogogoup' 
      }
    ],
    sidebar: {
      '/DailyShare/': [
        '2019.6.19',
        '2019.6.18',
      ],
      '/Writting/': [
        '2019.7.2',
        '2019.6.27',
        '2019.6.20',
        '2019.6.19',
      ],
      '/': [
        'Javascript',
        'Go',
        'C',
        'Git',
        // 'SomeIdea'
      ],
    },
    lastUpdated: 'Last Updated',
  },
  base: "/note/"
}
module.exports = {
  title: 'doFun',
  description: "be water my friend",
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
        '2020-02-10',
        '2019-12-05',
        '2019-11-11',
        '2019-10-11',
        '2019-09-26',
        '2019-06-19',
        '2019-06-18',
      ],
      '/Writting/': [
        // '2019.12.17',
        '2019.8.20',
        'bwsbcfwkff',
        '2019.7.2',
        '2019.6.27',
        '2019.6.20',
        '2019.6.19',
      ],
      '/': [
        '计算机基础',
        'Javascript',
        'Css',
        'Go',
        'C',
        'Git'
      ],
    },
    lastUpdated: 'Last Updated',
  },
  base: "/note/"
}
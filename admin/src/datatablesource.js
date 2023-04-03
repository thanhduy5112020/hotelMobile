export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAVFBMVEX19fWFeXv///+BdXf5+fmYjo9+cXP4+Pj7/Pzt6+vw7u+on6GUioy/uLnz8fKMgIKtpabV0dHNyMnm4+OflpiOg4W2r7DGwcLb19iimJrg3d3KxMU99sHlAAAE10lEQVR4nO2c2WLiMAxFEyXYyr6QBdL//8+JA7SkBRp7YlvM6Dy2PPhibZZlgoBhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGGZnJCICAGLseyV/QTwLKJPp1LbNdExnPeh7RSZIhPJUdH0YRUJEUdh3Q5sgSN/r0kQCTkMfKQU3Zj1V1gbvJQWx6WYV4XeEyMc3khLDdH6g4roveYtv4isoi1A8lnGRkiXge41bgKR7IWMxsP70BuYFp+oXHfOmRCN5JdCET7xjvSkFcSXQRFt0kFcC06b9WJSMhD0ek36rjtlRTmSVxMHhVz+/E9KnVPMJFBo6ZuPKkKabYKIjQylpaRoXZFoboowroHhKwWm7o9+2hGTk0t4QoluCR10ZIU0v0QxZVyEduQgs41zbRRQJNSUGrr5sCTl3N7KsJSn6Xvk3UD9mKea4RSu7S6lRLq440toS7fLkhmhoOQlOpkKIeTs0Ri6ynBR9r30FtKZChn9FSM1CrPDPmBY2hmmEmrObh98PWkLitDITEp1oZXaJBzPbqqjV8VCbFY2HmFbRGMCHWRlPLGgZV40ED+3YmThJlZJro8Bo0nwgltcVaBKAo4lYzFLAoL0loqPYxsZEe0uoHQ+vaDdSxJmgYQXqnke3R0es8fAJnLSEUCt879Dyd5qefiHG82YlhK8QZ7DMNyqJwomsYSkw6TcpiUK6l9MXINlyRS0q6jqUdf3uJyI/ktehpueK1/MokcjKN9Ch5hlPh2cDdItZfbzLCF0AcqyeSBHhkJKeC1ojIS168UOLENVwfLPpX4Sgqftl5FfJUcO/ojp/pO8iA/BzpRKgnMa6y/uq6vMuK5oUIf78J+lZZoRTVwdf37lcxsjLJCkDNSD/dTyfI9uhRaqhS0KSzRZ0OK6/aynjWK7/Amk2W1o30bQzxHGZLxXh+Dq8Irb95YNDQHBTIPnM6K++69navsa0RT5R8xS5GvcVYT3BoyXGgFMd3n9wBFKNLQnjerxUhFkTzJ5+LyYGSNsuWldiYqCU5hF/Hg2F6IcmUXHrCqZt/SDfi3NARgniw1a8ejCSn+uhGGeKoavEw7JYdFSOivGLOZQlo194WkaKQ0lCiXy8HxrQUCINWqU/lJxj/0qMuvA/lNTe84lmU+6pEt+zNVpj/S/x242QGh2513ju1+3iIBdE5tFNjIaWnyrxdy8q8bf3bTp4NC7jkaDHeLtzx3KviHXD09Wo4czyczxdxRlcfv6Gn/djO9RY35m3xH0ItrAhfqa3dvcQhQcviYO9Q9YF54Fr5xxyw30u2a1a/EZVum0P7Vpl3eO64rLi6osQt+4updnTsC04HTs1fBq2BbcTzdYsy7FtSbNJzG24nNc0flG1BZdjdZay4VWIw5xoofD9Ijo4cxLjif6NOAvAVl1EOYkzIfu0SZ8KcTbraDGLLEKcPUQ2fCuylSiXjg68NtOhwtUrn7i0cFpf4eiYaO0scsPVmcRy0HIXtqwWKIsQR0WK5eg7h62zIyE2K61FiKNfSzH4bR1NIbmbX7QAy2kkjPrSiRDb+VBlRBeHRBnbLeLdCbHYCrrh5M2SLCs1zGsT4ebxFRb5wSp55qb8lRDbRTr7AW1pGUcyGIZhGIZhGIZhGIZhGIZhGIZhGIZhGOb/xfblvyv+AA62S1QT4mrPAAAAAElFTkSuQmCC"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },


  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 150 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
    // renderCell: (params) => {
    //   return (
    //     <div className="cellWithImg">
    //       <img className="cellImg" src={params.row.photo[0] || "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAVFBMVEX19fWFeXv///+BdXf5+fmYjo9+cXP4+Pj7/Pzt6+vw7u+on6GUioy/uLnz8fKMgIKtpabV0dHNyMnm4+OflpiOg4W2r7DGwcLb19iimJrg3d3KxMU99sHlAAAE10lEQVR4nO2c2WLiMAxFEyXYyr6QBdL//8+JA7SkBRp7YlvM6Dy2PPhibZZlgoBhGIZhGIZhGIZhGIZhGIZhGIZhGIZhGGZnJCICAGLseyV/QTwLKJPp1LbNdExnPeh7RSZIhPJUdH0YRUJEUdh3Q5sgSN/r0kQCTkMfKQU3Zj1V1gbvJQWx6WYV4XeEyMc3khLDdH6g4roveYtv4isoi1A8lnGRkiXge41bgKR7IWMxsP70BuYFp+oXHfOmRCN5JdCET7xjvSkFcSXQRFt0kFcC06b9WJSMhD0ek36rjtlRTmSVxMHhVz+/E9KnVPMJFBo6ZuPKkKabYKIjQylpaRoXZFoboowroHhKwWm7o9+2hGTk0t4QoluCR10ZIU0v0QxZVyEduQgs41zbRRQJNSUGrr5sCTl3N7KsJSn6Xvk3UD9mKea4RSu7S6lRLq440toS7fLkhmhoOQlOpkKIeTs0Ri6ynBR9r30FtKZChn9FSM1CrPDPmBY2hmmEmrObh98PWkLitDITEp1oZXaJBzPbqqjV8VCbFY2HmFbRGMCHWRlPLGgZV40ED+3YmThJlZJro8Bo0nwgltcVaBKAo4lYzFLAoL0loqPYxsZEe0uoHQ+vaDdSxJmgYQXqnke3R0es8fAJnLSEUCt879Dyd5qefiHG82YlhK8QZ7DMNyqJwomsYSkw6TcpiUK6l9MXINlyRS0q6jqUdf3uJyI/ktehpueK1/MokcjKN9Ch5hlPh2cDdItZfbzLCF0AcqyeSBHhkJKeC1ojIS168UOLENVwfLPpX4Sgqftl5FfJUcO/ojp/pO8iA/BzpRKgnMa6y/uq6vMuK5oUIf78J+lZZoRTVwdf37lcxsjLJCkDNSD/dTyfI9uhRaqhS0KSzRZ0OK6/aynjWK7/Amk2W1o30bQzxHGZLxXh+Dq8Irb95YNDQHBTIPnM6K++69navsa0RT5R8xS5GvcVYT3BoyXGgFMd3n9wBFKNLQnjerxUhFkTzJ5+LyYGSNsuWldiYqCU5hF/Hg2F6IcmUXHrCqZt/SDfi3NARgniw1a8ejCSn+uhGGeKoavEw7JYdFSOivGLOZQlo194WkaKQ0lCiXy8HxrQUCINWqU/lJxj/0qMuvA/lNTe84lmU+6pEt+zNVpj/S/x242QGh2513ju1+3iIBdE5tFNjIaWnyrxdy8q8bf3bTp4NC7jkaDHeLtzx3KviHXD09Wo4czyczxdxRlcfv6Gn/djO9RY35m3xH0ItrAhfqa3dvcQhQcviYO9Q9YF54Fr5xxyw30u2a1a/EZVum0P7Vpl3eO64rLi6osQt+4updnTsC04HTs1fBq2BbcTzdYsy7FtSbNJzG24nNc0flG1BZdjdZay4VWIw5xoofD9Ijo4cxLjif6NOAvAVl1EOYkzIfu0SZ8KcTbraDGLLEKcPUQ2fCuylSiXjg68NtOhwtUrn7i0cFpf4eiYaO0scsPVmcRy0HIXtqwWKIsQR0WK5eg7h62zIyE2K61FiKNfSzH4bR1NIbmbX7QAy2kkjPrSiRDb+VBlRBeHRBnbLeLdCbHYCrrh5M2SLCs1zGsT4ebxFRb5wSp55qb8lRDbRTr7AW1pGUcyGIZhGIZhGIZhGIZhGIZhGIZhGIZhGOb/xfblvyv+AA62S1QT4mrPAAAAAElFTkSuQmCC"} alt="avatar" />
    //       {params.row.name}
    //     </div>
    //   );
    // },
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "total",
    headerName: "Revenue $",
    width: 150,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
];

export const roomColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "desc",
    headerName: "Description",
    width: 200,
  },
  {
    field: "price",
    headerName: "Price",
    width: 100,
  },
  {
    field: "maxPeople",
    headerName: "Max People",
    width: 100,
  },
];
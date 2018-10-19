# Nearbi

Explore recommended places nearby

![nearbi-demo](https://user-images.githubusercontent.com/19676143/47187606-b626a900-d2e9-11e8-9ba9-7bd88be71deb.gif)

### Development

This project is bootstrapped using Create React App. Map is powered using MapBox GL and places data is retrieved from FourSquare API.

To start developing this project, you will need to sign up and obtain API keys from [MapBox](https://www.mapbox.com) and [FourSquare](https://www.foursquare.com). Enter your API keys in the `.env` file in the project's root directory.

```
REACT_APP_MAPBOX_GL=[YOUR_MAPBOX_API_KEY_HERE]
REACT_APP_FOURSQUARE_CLIENT_ID=[YOUR_FOURSQUARE_CLIENT_ID_HERE]
REACT_APP_FOURSQUARE_CLIENT_SECRET=[YOUR_FOURSQUARE_CLIENT_SECRET_HERE]
```

Install all dependencies and start the development server

```
yarn install // or npm install
yarn start // or npm start
```

### Contributing

Feel free to create a pull request

### License

This project is licensed under MIT

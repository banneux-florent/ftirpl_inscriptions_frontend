import moment from "moment";


export const rem = function (number) {
  return number * 16;
}

export const isDict = function (dict) {
  return typeof dict === 'object' && dict.constructor === Object;
}

export const isArr = function (arr) {
  return Array.isArray(arr);
}

export const isDictEmpty = function (dict) {
  return isDict(dict) && Object.keys(dict).length === 0;
}

export const isEmptyArray = function (arr) {
  return isArr(arr) && arr.length === 0;
}

export const isNotEmptyArray = function (arr) {
  return isArr(arr) && arr.length !== 0;
}

export const isInt = function(n) {
  return Number(n) === n && n % 1 === 0;
}

export const isFloat = function(n) {
  return Number(n) === n && n % 1 !== 0;
}

export const isNumber = function(n) {
  return isInt(n) || isFloat(n);
}

export const isString = function (s) {
  return typeof s === 'string' || s instanceof String;
}

export const isEmptyString = function (s) {
  return isString(s) && s.length === 0;
}

export const isNotEmptyString = function (s) {
  return isString(s) && s.length !== 0;
}

export const ucfirst = function (s) {
  return s[0].toUpperCase() + s.slice(1);
}

export const lcfirst = function (s) {
  return s[0].toUpperCase() + s.slice(1);
}

export const ucall = function (s) {
  return s.toUpperCase();
}

export const lcall = function (s) {
  return s.toLowerCase();
}

export const isFromAxios = function (obj) {
  return (typeof obj === 'object' && (obj.constructor.name === 'AxiosError' || obj.name === 'AxiosError'));
}

export class GeolocationCoords {
  constructor(param1, param2 = null) {
    this.longitude = 0;
    this.latitude = 0;

    this.update(param1, param2);
  }

  update(param1, param2) {
    if (isArr(param1)) {
      if (isNumber(param1[0]) && isNumber(param1[1])) {
        this.longitude = param1[0];
        this.latitude = param1[1];
      }
    } else if (isDict(param1)) {
      if (isNumber(param1['longitude']) && isNumber(param1['latitude'])) {
        this.longitude = param1['longitude'];
        this.latitude = param1['latitude'];
      }
    } else if (param1 instanceof GeolocationPosition) {
      this.longitude = param1.coords.longitude;
      this.latitude = param1.coords.latitude;
    } else if (typeof param1 === 'string') {
      const regex = /^SRID=4326;POINT \(-?[0-9]+(\.[0-9]+)? -?[0-9]+(\.[0-9]+)?\)$/
      if (regex.test(param1)) {
        let coords = param1.substring(17, param1.length - 1).split(" ");
        this.longitude = parseFloat(coords[0]);
        this.latitude = parseFloat(coords[1]);
      }
    } else {
      if (isNumber(param1) && isNumber(param2)) {
        this.longitude = param1;
        this.latitude = param2;
      }
    }
  }

  toString() {
    return "SRID=4326;POINT (" + this.longitude + " " + this.latitude + ")";
  }

  toStringForUser(usingDegrees = false) {
    if (!usingDegrees)
      return this.latitude + ", " + this.longitude;
    else
      return this.decimalToDegrees(this.latitude, true) + ", " + this.decimalToDegrees(this.longitude, false);
  }

  decimalToDegrees(decimal, isLat) {
    const degrees = Math.floor(decimal);
    const minutesDecimal = (decimal - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = (minutesDecimal - minutes) * 60;

    const direction = isLat ? (decimal >= 0 ? "N" : "S") : (decimal >= 0 ? "E" : "W");

    return `${degrees}°${minutes}'${seconds.toFixed(2)}"${direction}`;
  }

  toRadians(deg) {
    return deg * (Math.PI / 180)
  }

  distanceFrom(geolocation) {
    let R = 6378.1370; // Radius of the earth in km
    let dLat = this.toRadians(geolocation.latitude - this.latitude);
    let dLon = this.toRadians(geolocation.longitude - this.longitude);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(this.latitude)) * Math.cos(this.toRadians(geolocation.latitude)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  }

  distanceTo(geolocation) {
    return this.distanceFrom(geolocation);
  }
}

export const formattedDateFromNow = function(date, locale) {
  return moment(date).locale(locale).fromNow();
}

export const formattedDate = function(date, locale, format = "LLLL") {
  return moment(date).locale(locale).format(format);
}

export const getIndexesFromKey = function (key, data) {
  let indexes = [];
  if (isArr(data) && isString(key)) {
    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      if ("key" in elem) {
        if (elem.key === key)
          indexes.push(i);
      }
    }
  }
  return indexes;
}

export const getElementFromKey = function (key, data) {
  if (isArr(data) && isString(key)) {
    for (let i = 0; i < data.length; i++) {
      const elem = data[i];
      if ("key" in elem) {
        if (elem.key === key)
          return elem
      }
    }
  }
  return null;
}

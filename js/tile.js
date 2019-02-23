function Tile(position, value, name) {
  this.x                = position.x;
  this.y                = position.y;
  this.value            = value;
  this.name             = name;

  this.previousPosition = null;
  this.mergedFrom       = null; // Tracks tiles that merged together
}

Tile.nameSet = {
  '-2': ['Five-seveN'],
  '1': ['M1 Garand', 'M1A1', 'SPP-1', 'PSG-1', 'F1', 'Gepard M1', 'SM-1'],
  '2': ['Sten MkII', 'M2HB', 'Welrod MkII', 'K2'],
  '91/38': ['Carcano M91/38'],
  '3': ['M3', 'G3', 'MG3', 'EVO 3', 'SR-3MP', 'XM3', 'SPR A3G', 'Type 03'],
  '4': ['M4A1', 'M4 SOPMOD II', 'Spectre M4', 'MG4', 'Cx4 Storm', 'Cx4 Storm'],
  '5': ['MP5', 'Grizzly MkV', 'MG5', 'Ak 5', 'JS05', 'K5'],
  '6': ['FP-6', 'PM-06'],
  '7': ['MP7', 'P7'],
  '8': ['P08', 'S.A.T.8', 'XM8'],
  '9': ['M9', 'FMG-9', 'FNP-9', 'UMP9', 'MT-9', 'KLIN', 'JS 9', 'TEC-9'],
  '10': ['MAC-10', 'Super SASS', 'Bren Ten'],
  '11': ['G11', 'K11'],
  '12': ['OTs-12', 'Saiga-12', 'SPAS-12', 'AA-12', 'USAS-12', 'M12', 'AK-12', 'Mk 12'],
  '12.7': ['ASh-12.7'],
  '14': ['M14', 'OTs-14', '2B14'],
  '15': ['ST AR-15'],
  '16': ['M16A1'],
  '17': ['Glock 17'],
  '18': ['PP-19-01', 'GSh-18'],
  '19': ['PP-19'],
  '20': ['NTW-20', 'RT-20'],
  '21': ['M21', 'TAR-21', 'Zas M21', 'HK21', 'SAR-21'],
  '22': ['P22'],
  '23': ['Mk23', 'KS-23', 'HK23'],
  '28': ['DP28', 'G28'],
  '29': ['wz.29'],
  '30': ['AGS-30'],
  '31': ['K31'],
  '33': ['Tokarev'],
  '34': ['MG34'],
  '36': ['G36', 'G36C'],
  '37': ['M37'],
  '38': ['P38', 'Beretta Model 38', 'SVT-38'],
  '39': ['PzB 39', 'OTs-39'],
  '40': ['MP40', 'UMP40'],
  '41': ['PPSh-41', 'PTRD', 'G41'],
  '42': ['MG42', 'FG42'],
  '43': ['PPS-43', 'G43'],
  '44': ['StG44', 'OTs-44'],
  '45': ['m45', 'UMP45', 'HK45'],
  '46': ['Mk46'],
  '47': ['AK-47'],
  '48': ['Mk48'],
  '49': ['FN-49'],
  '50': ['DSR-50', 'TAC-50'],
  '52': ['AAT-52', 'CZ52'],
  '55': ['Type 56-1'],
  '56.5': ['Type 56'],
  '59': ['BM59', 'Type 59'],
  '60': ['M60'],
  '61': ['Skorpion'],
  '62': ['Z-62', '6P62', 'Type 62'],
  '63': ['Type 63'],
  '64': ['Type 64', 'Howa Type 64'],
  '65': ['T65'],
  '69': ['SSG 69'],
  '70': ['AR70'],
  '71': ['BGM-71'],
  '74': ['AK-74U'],
  '75': ['NZ75', 'CZ75'],
  '77': ['T77'],
  '79': ['Type 79'],
  '80': ['Type 80'],
  '81': ['Type 81 Carbine'],
  '82': ['M82A1'],
  '88': ['Hanyang Type 88', 'Type 88'],
  '85': ['L85A1'],
  '90': ['PP-90', 'P90'],
  '91': ['9A-91', 'T91', 'A-91'],
  '92': ['Type 92'],
  '93': ['RMB-93'],
  '94': ['AN-94'],
  '95': ['Type 95', 'X95'],
  '96': ['C96'],
  '97': ['Type 97', 'Type 97 Shotgun'],
  '98': ['SV-98', 'Kar98k'],
  '99': ['P99', 'M99'],
  '100': ['Type 100'],
  '160': ['ARX-160'],
  '226': ['P226'],
  '249': ['M249 SAW'],
  '416': ['HK416'],
  '443': ['MP-443'],
  '446': ['MP-446'],
  '448': ['MP-448'],
  '500': ['M500'],
  '510': ['SIG-510'],
  '556': ['ART556'],
  '590': ['M590'],
  '635': ['RO635'],
  '805': ['CZ-805'],
  '870': ['M870'],
  '941': ['Jericho'],
  '950': ['M950A'],
  '999': ['AEK-999'],
  '1014': ['M1014'],
  '1887': ['M1887'],
  '1891': ['Mosin-Nagant', 'Carcano M1891'],
  '1895': ['Nagant Revolver'],
  '1897': ['M1897'],
  '1903': ['Springfield'],
  '1911': ['M1911'],
  '1918': ['M1918', 'Ribeyrolles'],
  '1919': ['M1919A4'],
  '1928': ['Thompson'],
  '2000': ['PP-2000', 'WA2000', 'F2000', 'IWS 2000', 'NS2000', 'CZ2000', 'UKM-2000', 'HS2000'],
  '5000': ['T-5000'],
};

Tile.getRandInitTile = function (cell) {
  if (Math.random() < 0.8) {
    return new Tile(cell, '2', 'Sten MkII');
  } else {
    return new Tile(cell, '1', 'M1 Garand');
  }
}

Tile.getRandNewTile = function (cell, value) {
  var nameList = Tile.nameSet[value];
  if (nameList) {
    var name = nameList[Math.floor(Math.random() * nameList.length)]
    return new Tile(cell, value, name)
  } else {
    return null;
  }
}

Tile.prototype.getFileName = function () {
  if (this.value == '91/38') {
    return 'Carcano M91-38.png';
  }
  return this.name + '.png';
};

Tile.prototype.savePosition = function () {
  this.previousPosition = { x: this.x, y: this.y };
};

Tile.prototype.updatePosition = function (position) {
  this.x = position.x;
  this.y = position.y;
};

Tile.prototype.serialize = function () {
  return {
    position: {
      x: this.x,
      y: this.y
    },
    value: this.value,
    name: this.name
  };
};

Tile.prototype.getScore = function () {
  if (this.value == '91/38') {
    return 9138;
  } else if (this.value == '-2') {
    return 57;
  } else {
    return parseFloat(this.value);
  }
}

Tile.prototype.getNumValue = function () {
  return (this.value == '91/38') ? 91/38 : parseFloat(this.value);
}

Tile.prototype.calcOper = function (nextTile, operation) {
  var a = this.getNumValue();
  var b = nextTile.getNumValue();
  var num = operation(a, b);
  var value = (num == 91/38) ? '91/38' : num.toString();
  return value;
} 

Tile.prototype.mergeable = function (nextTile, operation) {
  var value = this.calcOper(nextTile, operation)
  return (value in Tile.nameSet);
}


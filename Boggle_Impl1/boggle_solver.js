//Collaborated with Deontae Smith
 
exports.findAllSolutions = function (grid, dictionary) {
 let solutions = [];

  if (grid == null || dictionary == null){
  return solutions;
  }

  let N = grid.length
  let grid_Valid = true;
  for (let i=0; i < N; i++){
    if (grid[i].length != N){
      grid_valid = false;
    }
  }

  lowercaseFunctionHelp(grid, dictionary);

  let hash = newHash(dictionary);
  let solutionSet = new Set();

  for (let y_Coor = 0; y_Coor < N; y_Coor++) {
    for (x_Coor = 0; x_Coor < N; x_Coor++) {
      let word = "";
      let visited = new Array(N).fill(false).map(() => new Array(N).fill(false));
      findWords(word, y_Coor, x_Coor, grid, visited, hash, solutionSet);
    }
  }

  solutions = Array.from(solutionSet);
  return solutions;
};

lowercaseFunctionHelp = function (grid, dict) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
    }
  }

  for (let i = 0; i < dict.length; i++) {
    dict[i] = dict[i].toLowerCase();
  }
};

findWords = function (word, y_Coor, x_Coor, grid, visited, hash, solutionSet) {
  let neighbor_Coor = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, 1],
    [1, 1],
    [1, 0],
    [1, -1],
    [0, -1],
  ];

  if (
    y_Coor < 0 ||
    x_Coor < 0 ||
    y_Coor >= grid.length ||
    x_Coor >= grid.length ||
    visited[y_Coor][x_Coor] == true
  )
    return;

  word += grid[y_Coor][x_Coor];

  if (hash[word] != undefined) {
    visited[y_Coor][x_Coor] = true;

    if (hash[word] == 1) {
      if (word.length >= 3) solutionSet.add(word);
    }

    for (let i = 0; i < 8; i++) {
      findWords(
        word,
        y_Coor + neighbor_Coor[i][0],
        x_Coor + neighbor_Coor[i][1],
        grid,
        visited,
        hash,
        solutionSet
      );
    }
  }
  visited[y_Coor][x_Coor] = false;
};


newHash = function (dictionary) {
  var dict = {};
  for (let i = 0; i < dictionary.length; i++) {
    dict[dictionary[i]] = 1;
    let wordlength = dictionary[i].length;
    var str = dictionary[i];

    for (let j = wordlength; wordlength > 1; wordlength--) {
      str = str.substr(0, wordlength - 1);

      if (str in dict) {
        if (str == 1) {
          dict[str] = 1;
        }
      } else {
        dict[str] = 0;
      }
    }
  }
  return dict;
};




var grid = [['T', 'W', 'Y', 'R'],
              ['E', 'N', 'P', 'H'],
              ['G', 'Z', 'Qu', 'R'],
              ['St', 'N', 'T', 'A']];
var dictionary = ['art', 'ego', 'gent', 'get', 'net', 'new', 'newt', 'prat',
                    'pry', 'qua', 'quart', 'quartz', 'rat', 'tar', 'tarp',
                    'ten', 'went', 'wet', 'arty', 'egg', 'not', 'quar'];

console.log(exports.findAllSolutions(grid, dictionary));
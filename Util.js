const Util = {
  print2DArray: function (grid) {
    for (let i = 0; i < grid.length; i++) {
      console.log(...grid[i]);
    }
    console.log();
  },
  copyGrid: function (from, to) {
     for(let i = 0; i < from.length; i++){
          to[i] = [...from[i]];
     }
  },
};

export { Util };

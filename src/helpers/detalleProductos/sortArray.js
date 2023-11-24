export const sortArray = (computedData) =>{
    const sortedComputedData = computedData.sort((a, b) => {
        const nombreA = a.nombreProducto.toLowerCase();
        const nombreB = b.nombreProducto.toLowerCase();
      
        if (nombreA < nombreB) {
          return -1;
        } else if (nombreA > nombreB) {
          return 1;
        } else {
          return 0;
        }
      });

}
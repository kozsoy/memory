const shuffle = arr => {
    for(let i = 0; i < arr.length; i++) {
      const x = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[x]] = [arr[x], arr[i]]
    }

    return arr;
}

export default shuffle;
const HOST = 'http://localhost:8080';
let socket;

const sendMessage = () => {
  username.readOnly = true;
  socket.emit('search', {
    username: username.value,
    query: query.value,
    msg: message.value
  });
  query.value = '';
  message.value = '';
  return false;
};

window.onload = () => {
  socket = io(HOST);
  socket.on('connect', () => {
    socket.on(`success`, response => {
      let picture = response.res.hits[0];
      let imageRegion = document.createElement('div');
      imageRegion.innerHTML = `${response.username} says:${response.msg}`;
      let image = document.createElement('img');
      image.src = picture.previewURL;
      image.alt = picture.tags;
      imageRegion.appendChild(image);
      pictures.appendChild(imageRegion);
    });

    socket.on(`broadcast`, response => {
      let picture = response.res.hits[0];
      let imageRegion = document.createElement('div');
      imageRegion.innerHTML = `${response.username} says:${response.msg}`;
      let image = document.createElement('img');
      image.src = picture.previewURL;
      image.alt = picture.tags;
      imageRegion.appendChild(image);
      pictures.appendChild(imageRegion);
    });

    socket.on(`failure`, response => {
      alert(response.data);
    });
  });
};

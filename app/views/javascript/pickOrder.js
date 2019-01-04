alert('hello world');

$.get('/api/orders', function (data) {
  alert('hello i am working');
  console.log(data);
});

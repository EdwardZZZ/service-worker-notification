var port;

console.log('2---')

self.addEventListener('push', function(event) {
  var obj = event.data.json();

  console.log(obj);

  if(obj.action === 'subscribe' || obj.action === 'unsubscribe') {
    fireNotification(obj, event);
    port.postMessage(obj);
  } else if(obj.action === 'init' || obj.action === 'chatMsg') {
    obj.title = 'chatMsg';
    fireNotification(obj, event);

    port.postMessage(obj);
  } 
});

// self.onmessage = function(e) {
//   console.log(e);
//   port = e.ports[0];
// }
self.addEventListener('message', function(e){
  console.log(e);
  port = e.ports[0];
});


function fireNotification(obj, event) {
  var title = 'Subscription change';  
  var body = obj.name + ' has ' + obj.action + 'd.'; 
  var icon = 'push-icon.png';  
  var tag = 'push';
   
  event.waitUntil(self.registration.showNotification(obj.title || title, {
    body: body,  
    icon: icon,  
    tag: tag  
  }));
}


var platform = new H.service.Platform({
    'apikey': 'P4dr5DnPPOyWP4mI6oe6f6IuzIGo65aQPJjaKtKO8as'
  });

  // Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();
var service = platform.getSearchService();

let ones = document.querySelector('.main-heading').textContent;


service.geocode({
  q: ones
},(result) => {

  var map = new H.Map(
    document.querySelector('.map'),
    defaultLayers.vector.normal.map,
    {
      zoom: 10,
      center:result.items[0].position 
    });
    map.addObject(new H.map.Market(result.items[0].position ));
    
    var ui = H.ui.UI.createDefault(map, defaultLayers);
  }, alert);



    

   
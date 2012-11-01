
var Map = {
	
	MAP_WIDTH: 760,
	MAP_HEIGHT: 600,
	MAP_OUTTER_TILEW: 19, // - 2 for border and dodgeball area
	MAP_OUTTER_TILEH: 15,
	
	MAP_INNER_TILEW: 15,
	MAP_INNER_TILEH: 11,
	
	// tile width/height should be same as the tile set we use, see SpriteDefinitions.js
	MAP_TILEWIDTH: 40,
	MAP_TILEHEIGHT: 40,
	
	Z_FLOOR: 1,
	Z_DESTRUCTIBLE:2,
	Z_INDESTRUCTIBLE:3,
	
	Z_BOMB: 5,
	Z_DRAGON: 6,
	
	_spawnPositions: [[0, 0], [15, 0], [0, 11], [15, 11]],
	
	instance: undefined,
};

Map.generate = function(map_name)
{	
	var map = Entities.Map(map_name);
	
	for (var dx = 0; dx < Map.MAP_OUTTER_TILEW; dx++)
	{
		for (var dy = 0; dy < Map.MAP_OUTTER_TILEH; dy++)
		{
			// outermost border for dodge ballers
			if (_isBorder(dx, dy))
			{
				map.attach(
					Crafty.e("2D, DOM, floor")
	            		.attr({ x: dx * Map.MAP_TILEWIDTH, y: dy * Map.MAP_TILEHEIGHT, z: Map.Z_FLOOR }));
	        }
	        // wall to separate dodge ballers
	        else if (_isWall(dx, dy))
	        {
	        	map.attach(
		    		Crafty.e("2D, DOM, solid, tileI")
						.attr({ x: dx * Map.MAP_TILEWIDTH, y: dy * Map.MAP_TILEHEIGHT, z: Map.Z_INDESTRUCTIBLE }));
	        }
	        // indestructible blocks in every other tile
		    else if ((dx % 2 !== 0) && (dy % 2 !== 0))
		    {
		    	map.attach(
		    		Crafty.e("2D, DOM, solid, tileD")
						.attr({ x: dx * Map.MAP_TILEWIDTH, y: dy * Map.MAP_TILEHEIGHT, z: Map.Z_INDESTRUCTIBLE }));
		    }
		    // everything else is floor
		    else
		    {
		    	map.attach(
					Crafty.e("2D, DOM, floor")
	            		.attr({ x: dx * Map.MAP_TILEWIDTH, y: dy * Map.MAP_TILEHEIGHT, z: Map.Z_FLOOR }));
		    }
		}
	}
	// center the map
	map.shift(0.5*(Properties.DEVICE_WIDTH - Map.MAP_WIDTH), 0);
	
	Map.instance = map;
	
	return map;
};

function _isBorder(x, y){
	return x === 0 || x === (Map.MAP_OUTTER_TILEW-1) || y === 0 || y === (Map.MAP_OUTTER_TILEH-1);
};

function _isWall(x, y){
	return x === 1 || x === (Map.MAP_OUTTER_TILEW-2) || y === 1 || y === (Map.MAP_OUTTER_TILEH-2);
};

Map.spawnPlayer = function(color)
{
	var player = Entities.Dragon(color);
	Map.instance.attach(player);
	// TODO: choose random spawn points
	//player.attr({ x: Map.instance.x + Map.MAP_TILEWIDTH*2, y: Map.MAP_TILEHEIGHT*2, z: Map.Z_DRAGON});
	player.attr({ x: Map.instance.x, y: 0, z: Map.Z_DRAGON});
	return player;
}

Map.spawnBomb = function(x, y)
{
	
}

Map.spawnPowerup = function(type, x, y)
{
	
}






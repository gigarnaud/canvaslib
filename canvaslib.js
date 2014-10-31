;(function (globals) {

  // Global object g2d
  globals.g2d = {
  
    // Attributes
	
    canvas : {},
    selected_canvas : null,
    frame_callbacks : {},
    global_imgs : {},
    global_framerate : 25,
    
    
      
    
    // Objects
    
    // frame_callback_obj
    // Frame
    frame_callback_obj : function (callback) {
      
      // Attributes
      this.framerate = g2d.global_framerate;
      this.callback = callback;
      this.interval_object = null;
      
      this.start = function () {
        this.interval_object = setInterval (this.callback, (1000 / this.framerate));
      };
      
      this.stop = function () {
        clearInterval (this.interval_object);
      };
      
    },
    
    // static_img
    // Static image object
    // name : String, identifier of the object
      static_img : function () {
    
      // Attributes
      
      // Integer: Coordinates of the image inside the canvas
      this.x = 0;
      this.y = 0;
      this.z = 0;
      // Integer: Dimensions of the image
      this.width = 0;
      this.height = 0;
      // String: Name of the image inside g2d object
      this.name = "";
      // String (URL): Source of the image
      this.src = "";
      // Image object: internal browser object
      this.image = null;
      // Boolean: can't use this.image.complete (true if no image loaded)
      // true if image is loaded and ready to use
      this.ready = false;
      // Boolean: true if image will be drawn by the engine
      this.visible = true;
      
      
      // Methods
      
      // load_image : image loader, grabs src and loads into a new Image object
      this.load_image = function () {
        this.image = new Image ();
        this.image.onerror = function () {
          console.log ("Error! Can't load image " + url);
        };
        this.image.onload = function () {
          this.ready = true;
        };
        this.image.src = this.src;
      };
      
      // store_image : save image inside the g2d object
      this.store_image = function (name) {
        if (typeof (name) != "string") {
          console.log ("Error! Image name is not a string");
        }
        else if (g2d.global_imgs [name] != null) {
          console.log ("Error! The image already exists");
        }
        else {
          g2d.global_imgs [name] = this;
        }
      };
      
      // release_image : release image from the g2d object
      this.release_image = function () {
        if (g2d.global_imgs [this.name] == null) {
          console.log ("Error! The image doesn't exists");
        }
        else {
          delete g2d.global_imgs [this.name];
        }
      };
      
    },
    
    
    // Methods
    
    // Canvas selection and attachment
    
    // attach
    // Assign to a canvas
    attach : function (canvas) {
      if (canvas.tagName != "CANVAS") {
        console.log ("Error! Object is not a canvas");
      }
      g2d.canvas [canvas.id] = canvas;
    },
    
    // detach
    // Detach an assigned canvas
    detach : function (canvas) {
        if (canvas.tagName != "CANVAS") {
        console.log ("Error! Object is not a canvas");
      }
      else if ((g2d.canvas [canvas.id] === undefined)) {
        console.log ("Error! Canvas wasn't previouly attached");
      }
      else {
        delete g2d.canvas [canvas.id];
      }
    },
    
    // select_canvas
    // Select the canvas destination
    select_canvas : function (canvas) {
      if (canvas.tagName != "CANVAS") {
        console.log ("Error! Object is not a canvas");
      }
      else if ((g2d.canvas [canvas.id] === undefined)) {
        console.log ("Error! Canvas wasn't previouly attached");
      }
      else {
        g2d.selected_canvas = canvas;
      }
    },
    
    
    // Callback and frame related
    
    // add_frame_callback
    // Add a frame callback function
    add_frame_callback : function (name, callback_function) {
      if (typeof (name) != "string") {
          console.log ("Error! The callback name is not a string");
      }
      else if (typeof (callback_function) != "function") {
        console.log ("Error! The callback function is not a function");
      }
      else if (g2d.frame_callbacks [name] != null) {
        console.log ("Error! The callback is already in use");
      }
      else {
        g2d.frame_callbacks [name] = new g2d.frame_callback_obj (callback_function);
      }
    },
    
    // start_frame_callback
    // Start the function
    start_frame_callback : function (name) {
      if (typeof (name) != "string") {
        console.log ("Error! It has to be a valid callback name");
      }
      else if (g2d.frame_callbacks [name] == null) {
        console.log ("Error! callback doesn't exist");
      }
      else {
        g2d.frame_callbacks [name].start ();
      }
    },
    
    // stop_frame_callback
    // Stop the callback function
    stop_frame_callback : function (name) {
      if (typeof (name) != "string") {
        console.log ("Error! It has to be a valid callback name");
      }
      else if (g2d.frame_callbacks [name] == null) {
        console.log ("Error! callback doesn't exist");
      }
      else {
        g2d.frame_callbacks [name].stop ();
      }
    }
    
    
    // Image global structure related
    // Release image
    release_image : function (name) {
      var image = null;
      if (typeof (name) == "string") {
        console.log ("Error! Name is not a string");
      }
      else if (g2d.global_images [name] == null) {
        console.log ("Error! Image " + name + " doesn't exist");
      }
      else {
        image = g2d.global_images [name];
        delete g2d.global_images [name];
      }
      return image;
    }
	
	
  }

})(window);
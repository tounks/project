
    var CameraFaceHelper = function (camera) {
        this.cameraFaceList = {};
        var pos = camera.getDerivedPosition();
        this.target_camera = new Vector3(pos.x,pos.y,pos.z);// target_camera.x=0; target_camera.y=8.67107;  target_camera.z=14.1986;
        this.fire_up = new Vector3(0,1.0,0);
    };

    //绑定某个物体。
    CameraFaceHelper.prototype.add = function(gameObj) {
            if(gameObj){
                this.cameraFaceList[gameObj.getName()] = gameObj;  
            }
    };
    
    CameraFaceHelper.prototype.remove = function(gameObj) {
            if(gameObj){
                 this.cameraFaceList[gameObj.getName()] = null;  
            }
    };
    

   CameraFaceHelper.prototype.update = function() {
         for(var i in this.cameraFaceList){
            this.target_camera.y = this.cameraFaceList[i].getTransform()._getDerivedPosition().y;
            this.cameraFaceList[i].lookAt(this.target_camera,this.fire_up);
        }
    };
function XW3DController() {
    /*
    自定义工厂方法：3D场景控制
    */
    var self=this;


    /*
    3D场景的全局变量的配置文件
    */
    self.XW3DConfig = {
        // 资源的加载路径（勿动）
        XW3DResPath:"/static/scene",
        // 音乐的加载路径（勿动）
        XW3DMusicPath:"/static/music/",
        // 加载3D场景时 是否 加载动作声音(控制所有的声音标签，级别最高)（初始化3D场景前重置有效，默认为false）
        XW3DIsLoadedAudio:true,
        // 加载3D场景时 是否 加载入场动画（默认为true）
        XW3DIsLoadedRuChangAni:true
    };


    /*
    3D场景的全局变量，记录某些特殊状态
    */
    self.XW3DState = {
        // 3D场景是否加载完成（默认为false）
        XW3DSceneLoadedOk:false
    };


    /*
    每个动画开始播放时的接口回调(V4.0新增)
    */
    // “打招呼”播放开始回调
    self.OnAniStartedDZH = function(){
    };
    // “撒娇”播放开始回调
    self.OnAniStartedSJ = function(){
    };
    // “卖萌”播放开始回调
    self.OnAniStartedMM = function(){
    };
    // “亲亲”播放开始回调
    self.OnAniStartedQQ = function(){
    };
    // “跳舞”播放开始回调
    self.OnAniStartedTW = function(){
    };
    // “说话”播放开始回调
    self.OnAniStartedSH = function(){
    };
    // “撒红包”播放开始回调
    self.OnAniStartedSHB = function(){


    };

    /*
    每个动画播放完的接口回调(V4.0新增)
    */
    // 入场动画播放完成回调
    self.OnAniEndedRuChang = function(){
    };
    // “打招呼”播放完成回调
    self.OnAniEndedDZH = function(){
    };
    // “撒娇”播放完成回调
    self.OnAniEndedSJ = function(){
    };
    // “卖萌”播放完成回调
    self.OnAniEndedMM = function(){
    };
    // “亲亲”播放完成回调
    self.OnAniEndedQQ = function(){
    };
    // “跳舞”播放完成回调
    self.OnAniEndedTW = function(){
        
    };
    // “说话”播放完成回调
    self.OnAniEndedSH = function(){
    };
    // “撒红包”播放完成回调
    self.OnAniEndedSHB = function(){

    };

    /*
    业务相关回调接口
    */
    // 红包图片点击之后的回调,该方法在点击大红包图片之前调用有效
    self.TouchCallBackDaHongBao = function(){
    };


    /*
    初始化3D场景并显示
    XW3DInit(opt)
        :parms:opt          页面上自添加的3D场景的场景和音乐dom节点
        {
             xw3dSceneDom,
             xw3dMusicDom
        }
    */
    self.XW3DInit = function(opt){
        if(!opt){
            var opt={};
            opt.xw3dSceneDom='body';
            opt.xw3dMusicDom='body';
        }
        if( !opt.xw3dSceneDom ){
            opt.xw3dMusicDom='body';
        }
        if( !opt.xw3dMusicDom ){
            opt.xw3dMusicDom='body';
        }

        // 将音乐添加到 页面上自添加的3D场景的音乐dom节点 上
        if(self.XW3DConfig.XW3DIsLoadedAudio){
            self.XW3DCreateMusic(opt.xw3dMusicDom);
        }
        // 将3D场景添加到 页面上自添加的3D场景的场景dom节点 上
        self.XW3DCreateDiv(opt.xw3dSceneDom);
        // 渲染3D场景
        self.XW3DCreateScene();
    };


    /*
    将音乐添加到 页面上自添加的3D场景的音乐dom节点 上
    XW3DCreateMusic(xw3dMusicDom)
        :parms:xw3dMusicDom          页面上自添加的3D场景的音乐dom节点
    */
    self.XW3DCreateMusic = function(xw3dMusicDom){
        $(xw3dMusicDom).append(
            '<audio src="'+self.XW3DConfig.XW3DMusicPath+'jc.mp3" id="dodo3d_loginSound_music" preload="auto" class="xw_3d_music" ></audio>'
            + '<audio src="'+self.XW3DConfig.XW3DMusicPath+'qq.mp3" id="dodo3d_qinqin_music" preload="auto" class="xw_3d_music" ></audio>'
            + '<audio src="'+self.XW3DConfig.XW3DMusicPath+'mm.mp3" id="dodo3d_maimeng_music" preload="auto" class="xw_3d_music" ></audio>'
            +'<audio src="'+self.XW3DConfig.XW3DMusicPath+'dzh.mp3" id="dodo3d_zhaohu_music" preload="auto" class="xw_3d_music" ></audio>'
            +'<audio src="'+self.XW3DConfig.XW3DMusicPath+'sj.mp3" id="dodo3d_sajiao_music" preload="auto" class="xw_3d_music" ></audio>'
            +'<audio src="'+self.XW3DConfig.XW3DMusicPath+'shb.mp3" id="dodo3d_sahongbao_music" preload="auto" class="xw_3d_music" ></audio>'
            +'<audio src="'+self.XW3DConfig.XW3DMusicPath+'sh.mp3" id="dodo3d_shuohua_music" preload="auto" class="xw_3d_music" ></audio>'
            +'<audio src="'+self.XW3DConfig.XW3DMusicPath+'tw.mp3" id="dodo3d_tiaowu_music" preload="auto" class="xw_3d_music" ></audio>'
        );
    };


    /*
    将3D场景添加到 页面上自添加的3D场景的场景dom节点 上
    XW3DCreateDiv(xw3dSceneDom)
        :parms:xw3dSceneDom          页面上自添加的3D场景的场景dom节点
    */
    self.XW3DCreateDiv = function(xw3dSceneDom){
        // 获取3D场景的场景dom节点
        var dom=document.getElementById(xw3dSceneDom);
        // 获取3D场景的场景dom节点的样式属性
        var domStyle=window.getComputedStyle(dom,null)
        var width = domStyle.width;
        var height = domStyle.height;
        // 将3D场景添加到 页面上自添加的3D场景的场景dom节点 上
        $("#"+xw3dSceneDom).append(
        '<div id="xw_3d_canvas">'+
            '<!-- 3D 场景div -->'+
            '<div id="canvas-area">'+
                '<canvas id="canvas" width="'+width+'" height="'+height+'">'+
                '</canvas>'+
            '</div>'+
        '</div>');
    };


    /*
    渲染3D场景
    XW3DCreateScene()
    */
    self.XW3DCreateScene = function(){
        // 获取3D的内部节点
        var xw_3d_canvas = document.getElementById("xw_3d_canvas");
        var canvasdiv = document.getElementById('canvas-area');
        var mCanvas = document.getElementById("canvas");
        // 渲染时设置不显示
        xw_3d_canvas.style.display = 'none';
        canvasdiv.style.display='none';
        var startLoadingTime = new Date().getTime();
        var orient = E3dOrientation.Portrait;
        function postJsonCall(jsonresult,me3d){
            window.addEventListener("resize",function(){
                 me3d.setOrientation(orient,canvasdiv,canvas);
            },false);
        };
        function postCreateSceneCall(me3d){
            var leftTime=100 - (new Date().getTime() - startLoadingTime);
            setTimeout(function(){
                    // 3D场景是否加载完成
                    self.XW3DState.XW3DSceneLoadedOk = true;
                    // 是否加载入场动画
                    if(self.XW3DConfig.XW3DIsLoadedRuChangAni){
                        window.magicFunc.RuChangAni();
                    }else{
                        window.magicFunc.NoRuChangAni();
                    }
                    // canvas-area出现
                    xw_3d_canvas.style.display = 'block';
                    canvasdiv.style.display = 'block';
            },leftTime<0?0:leftTime );
        };
        e3dLoadAsset(self.XW3DConfig.XW3DResPath, mCanvas,postJsonCall, postCreateSceneCall,1.0);
    };


    /*
    销毁3D场景
    XW3DDestroyScene()
    */
    self.XW3DDestroyScene = function(){
        if(self.XW3DState.XW3DSceneLoadedOk){
            $('#xw_3d_canvas').remove();
        }
        if($('.xw_3d_music').length>0){
            $('.xw_3d_music').remove();
        }
    };
};


var XW3DCtrl = new XW3DController();



this.MagicFunc = function(root, group_id, groupName) {
    this.root = root;
    window.this = this;
    this.mGroupId = group_id;
    this.mGroupName = groupName;
    this.root.setAppEventDelegate(this);
    this.root.setFrameEventDelegate(this);
};

//用物体名称获取物体的Handler
MagicFunc.prototype.getObjHandler = function(objName) {
    var sceneName = arguments[1] ? arguments[1] : "scene1";
    var obj = this.root.getSceneManager(sceneName).getSceneNode(objName);
    return obj;
};

//进度的限制方式一：首尾相接
MagicFunc.prototype.LimiteEndToEnd = function(progress) {
    return progress - Math.floor(progress);
};

//进度的限制方式二：两端停止
MagicFunc.prototype.LimiteStopToEnd = function(progress) {
    if (progress < 0.0) {
        progress = 0.0;
    } else if (progress > 1.0) {
        progress = 1.0;
    }
    return progress;
};

//用动画名称获取动画的Handler
MagicFunc.prototype.getAniHandler = function(aniName) {
    var ani = this.root.getAnimationManager().findAnimation(aniName);
    return ani;
};

//旋转物体跟随手指
MagicFunc.prototype.RotateObjectWithFinger = function(objectInfo, progress) {
    var nextProgress = objectInfo.Progress + objectInfo.Sensitivity * progress * objectInfo.Direction;
    this.RotateObject(objectInfo, nextProgress);
};

//根据手指缩放物体
MagicFunc.prototype.ScaleObjectWithFinger = function(objectInfo, scale) {
    objectInfo.ObjHandler.getTransform().setScale(scale, scale, scale);
};

//根据进度旋转物体
MagicFunc.prototype.RotateObject = function(objectInfo, progress) {
    this.nextAngle = (objectInfo.FromAngle[objectInfo.RotateAxis] + progress * (objectInfo.FromAngle[objectInfo.RotateAxis] - objectInfo.ToAngle[objectInfo.RotateAxis]))*(-0.05);
    objectInfo.ObjHandler.getTransform().resetOrientation();
    if (objectInfo.RotateAxis == 'x') {
        objectInfo.ObjHandler.getTransform().pitch(this.nextAngle);
    } else if (objectInfo.RotateAxis == 'y') {
        objectInfo.ObjHandler.getTransform().yaw(this.nextAngle);
    } else if (objectInfo.RotateAxis == 'z') {
        objectInfo.ObjHandler.getTransform().roll(this.nextAngle);
    }
    objectInfo.Progress = progress;
};

//计算手指的进度条
MagicFunc.prototype.CalculateFingerProgress = function(id, action, x, y) {
    if (id == 0) {
        if (action == 0) {
            this.FirstFinger.DownPosition.x = x;
            this.FirstFinger.DownPosition.y = y;
            this.FirstFinger.PreMovePosition.x = null;
            this.FirstFinger.PreMovePosition.y = null;
            this.FirstFinger.PreProgress.x = 0;
            this.FirstFinger.PreProgress.y = 0;
            this.FirstFinger.IsMoved = false;
            this.OnlyOneFingerTouched = true;
        } else if (action == 1) {
            this.FirstFinger.UpPosition.x = x;
            this.FirstFinger.UpPosition.y = y;
            this.OnlyOneFingerTouched = true;
        } else if (action == 2) {
            this.FirstFinger.IsMoved = true;
            if (this.FirstFinger.PreMovePosition.x == null || this.FirstFinger.PreMovePosition.y == null) {
                this.FirstFinger.PreMovePosition.x = x;
                this.FirstFinger.PreMovePosition.y = y;
            } else {
                this.FirstFinger.PreMovePosition.x = this.FirstFinger.MovePosition.x;
                this.FirstFinger.PreMovePosition.y = this.FirstFinger.MovePosition.y;
            }
            this.FirstFinger.MovePosition.x = x;
            this.FirstFinger.MovePosition.y = y;
            //计算手指的progress的变化值
            var dx = this.FirstFinger.MovePosition.x - this.FirstFinger.PreMovePosition.x;
            var dy = this.FirstFinger.MovePosition.y - this.FirstFinger.PreMovePosition.y;
            this.FirstFinger.Progress.x = dx / this.root.getScreenWidth();
            this.FirstFinger.Progress.y = dy / this.root.getScreenHeight();
            if (this.FirstFinger.Progress.x != 0) {
                this.FirstFinger.PreProgress.x = this.FirstFinger.Progress.x;
            }
            if (this.FirstFinger.Progress.y != 0) {
                this.FirstFinger.PreProgress.y = this.FirstFinger.Progress.y;
            }
            if (!this.OnlyOneFingerTouched) {
                var currentDistance = this.GetDistance(this.FirstFinger.MovePosition, this.SecondFinger.MovePosition);
                var scale = 1;
                if (currentDistance != 0) {
                    scale = currentDistance / this.SecondFinger.PreDistance;
                    this.ScaleObjectWithFinger(this.ObjectEvent, scale);
                }
            }
        }
    } else if (id == 1) {
        if (action == 0) {
            this.OnlyOneFingerTouched = false;
            this.SecondFinger.DownPosition.x = x;
            this.SecondFinger.DownPosition.y = y;
            this.SecondFinger.PreDistance = this.GetDistance(this.FirstFinger.DownPosition, this.SecondFinger.DownPosition);
            this.SecondFinger.IsMoved = false;
        } else if (action == 1) {
            this.SecondFinger.UpPosition.x = x;
            this.SecondFinger.UpPosition.y = y;
            this.OnlyOneFingerTouched = true;
        } else if (action == 2) {
            this.SecondFinger.IsMoved = true;
            this.SecondFinger.MovePosition.x = x;
            this.SecondFinger.MovePosition.y = y;
            //计算缩放比例
            var currentDistance = this.GetDistance(this.FirstFinger.MovePosition, this.SecondFinger.MovePosition);
            var scale = 1;
            if (currentDistance != 0) {
                scale = currentDistance / this.SecondFinger.PreDistance;
                this.ScaleObjectWithFinger(this.ObjectEvent, scale);
            }
        }
    }
};

MagicFunc.prototype.GetDistance = function(p1, p2) {
    var dx = p1.x - p2.x;
    var dy = p1.y - p2.y;
    return Math.sqrt(dx * dx + dy * dy);
};


MagicFunc.prototype.init = function() {
    // 面向相机
    var cam = this.root.getSceneManager("scene1").getCamera("camera1");
    this.faceCamHelper = new CameraFaceHelper(cam);

    this.initTouch();
    this.initState();
    this.initObjects();
    this.initAnimations();
    this.initEvents();
    this.initAudios();
    this.initParticleSystem();
};

MagicFunc.prototype.initTouch = function() {
    this.DeviceInfo = {
        'Width': 720,
        'Height': 1280
    };
    this.FirstFinger = {
        'DirectionCtrl': {
            'x': 1,
            'y': 1
        },
        'DownPosition': {
            'x': 0,
            'y': 0
        },
        'UpPosition': {
            'x': 0,
            'y': 0
        },
        'MovePosition': {
            'x': 0,
            'y': 0
        },
        'PreMovePosition': {
            'x': 0,
            'y': 0
        },
        'Progress': {
            'x': 0,
            'y': 0
        },
        'PreProgress': {
            'x': 0,
            'y': 0
        },
        'Sensitivity': {
            'x': 1.0,
            'y': 1.0
        },
        'DeltaProgress': {
            'x': 0,
            'y': 0
        },
        'DampingSpeed': {
            'x': 0.9,
            'y': 0.0
        },
        'IsMoving': false
    };
    this.SecondFinger = {
        'PreDistance': 0,
        'DirectionCtrl': {
            'x': 1,
            'y': 1
        },
        'DownPosition': {
            'x': 0,
            'y': 0
        },
        'UpPosition': {
            'x': 0,
            'y': 0
        },
        'MovePosition': {
            'x': 0,
            'y': 0
        },
        'PreMovePosition': {
            'x': 0,
            'y': 0
        },
        'Progress': {
            'x': 0,
            'y': 0
        },
        'PreProgress': {
            'x': 0,
            'y': 0
        },
        'Sensitivity': {
            'x': 1.0,
            'y': 1.0
        },
        'DeltaProgress': {
            'x': 0,
            'y': 0
        },
        'DampingSpeed': {
            'x': 0.9,
            'y': 0.0
        },
        'IsMoving': false
    };

    this.ObjectEvent = {};
    this.ObjectEvent.ObjHandler = this.getObjHandler("Group");
    this.ObjectEvent.IsMoving = false;
    this.ObjectEvent.ActiveFrame = false;
    this.ObjectEvent.SwitchEnable = {
        'move': false,
        'rotate': true,
        'scale': true
    };
    this.ObjectEvent.FromAngle = {
        'x': 0,
        'y': 0,
        'z': 0
    };
    this.ObjectEvent.ToAngle = {
        'x': 0,
        'y': 2 * Math.PI,
        'z': 0
    };
    this.ObjectEvent.AngleRange = {
        'x': (this.ObjectEvent.ToAngle.x - this.ObjectEvent.FromAngle.x),
        'y': (this.ObjectEvent.ToAngle.y - this.ObjectEvent.FromAngle.y),
        'z': (this.ObjectEvent.ToAngle.z - this.ObjectEvent.FromAngle.z)
    };
    this.ObjectEvent.ProgressLimitedType = 'EndToEnd';
    this.ObjectEvent.RotateAxis = 'y';
    this.ObjectEvent.DirectionCtrl = {
        'w': 1,
        'e': 1,
        'r': 1
    };
    this.ObjectEvent.Direction = 1;
    this.ObjectEvent.Sensitivity = 50.0;
    this.ObjectEvent.Progress = 0.0;
};

MagicFunc.prototype.initState = function() {
    // 接下来要播放的动画名称
    this.next_ani = '';
    // 当前是否可以动画
    this.can_ani = true;
};

MagicFunc.prototype.initObjects = function() {
    // 缩放
    this.group = this.getObjHandler("Group");
    this.group.getTransform().setScale(0.5,0.5,0.5);

    // 头部
    this.box_toubu = this.getObjHandler("box_toubu");
    // 脸
    this.box_lianbu = this.getObjHandler("box_lianbu");
    // 人物自身右手
    this.box_youshou = this.getObjHandler("box_youshou");
    // 人物自身左手
    this.box_zuoshou = this.getObjHandler("box_zuoshou");
    // 人物身体
    this.box_shenti = this.getObjHandler("box_shenti");
    // 人物右脚
    this.box_zuojiao1 = this.getObjHandler("box_zuojiao1");
    // 人物左脚
    this.box_zuojiao = this.getObjHandler("box_zuojiao");

    // 人大红包
    this.dahongbao = this.getObjHandler("dahongbao");
};

MagicFunc.prototype.initAnimations = function() {
    // 待机动画
    this.daijidonghua_AniSet = this.getAniHandler("daijidonghua_AniSet");
    this.daijidonghua_AniSet.setAnimationDelegate(this);

    // 入场动画
    this.ruchang_1_AniSet = this.getAniHandler("ruchang_1_AniSet");
    this.ruchang_1_AniSet.setAnimationDelegate(this);

    // 打招呼(点击头部)
    this.dazhaohu_1_AniSet = this.getAniHandler("dazhaohu_1_AniSet");
    this.dazhaohu_1_AniSet.setAnimationDelegate(this);

    // 撒娇(点击脸)
    this.shajiao_1_AniSet = this.getAniHandler("shajiao_1_AniSet");
    this.shajiao_1_AniSet.setAnimationDelegate(this);

    // 卖萌(点击右手)
    this.maimeng_1_AniSet = this.getAniHandler("maimeng_1_AniSet");
    this.maimeng_1_AniSet.setAnimationDelegate(this);

    // 亲亲(点击左手)
    this.qinqin_1_AniSet = this.getAniHandler("qinqin_1_AniSet");
    this.qinqin_1_AniSet.setAnimationDelegate(this);

    // 跳舞(点击身体)
    this.tiaowu_1_AniSet = this.getAniHandler("tiaowu_1_AniSet");
    this.tiaowu_1_AniSet.setAnimationDelegate(this);

    // 说话(点击右脚)
    this.shuohua_1_AniSet = this.getAniHandler("shuohua_1_AniSet");
    this.shuohua_1_AniSet.setAnimationDelegate(this);

    // 撒红包
    this.shahongbao_1_AniSet = this.getAniHandler("shahongbao_1_AniSet");
    this.shahongbao_1_AniSet.setAnimationDelegate(this);
    // 大红包
    this.hongbaodiao_AniSet = this.getAniHandler("hongbaodiao_AniSet");
    this.hongbaodiao_AniSet.setAnimationDelegate(this);
    this.hongbaodiao_alpha_value = this.getAniHandler("hongbaodiao_alpha_value");
    this.hongbaodiao_alpha_value.setAnimationDelegate(this);
};

MagicFunc.prototype.initParticleSystem = function() {
};

MagicFunc.prototype.initAudios = function() { 
    var that = this;  
};

MagicFunc.prototype.initEvents = function() {
    var that = this;

    // 点击头部
    this.box_toubu.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_toubu");
            that.startAni("dazhaohu_1_AniSet");
        }
    });

    // 点击脸部
    this.box_lianbu.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_lianbu");
            that.startAni("shajiao_1_AniSet");
        }
    });

    // 点击右手
    this.box_youshou.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_youshou");
            that.startAni("maimeng_1_AniSet");
        }
    });

    // 点击左手
    this.box_zuoshou.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_zuoshou");
            that.startAni("qinqin_1_AniSet");
        }
    })

    // 点击身体
    this.box_shenti.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_shenti");
            that.startAni("tiaowu_1_AniSet");
        }
    })

    // 点击右脚
    this.box_zuojiao1.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_zuojiao1");
            that.startAni("shuohua_1_AniSet");
        }
    })

    // 点击左脚
    this.box_zuojiao.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch box_zuojiao");
        }
    })

    // 点击大红包
    this.dahongbao.setTapCallback(function(tapEventData) {
        if (tapEventData.action == 0 && that.can_ani) {
            LogCtrl.print("touch dahongbao");
            that.dahongbao.setVisible(false);
            // 红包图片点击之后的业务处理(该方法在施魔法,撒红包 动画调用之前重写覆盖有效)
            if(typeof(XW3DCtrl.TouchCallBackDaHongBao)=="function"){
                XW3DCtrl.TouchCallBackDaHongBao();
            }
        }
    })
};

MagicFunc.prototype.startAni = function(ani) {
    if(this.can_ani){
        LogCtrl.print("startAni");
        this.can_ani = false;
        // 待机动画
        this.next_ani = ani;
        this.daijidonghua_AniSet.speedUp(200, 2083);
    }
};

MagicFunc.prototype.overAni = function() {
    LogCtrl.print("overAni");
    this.can_ani = true;
    // 待机动画
    this.daijidonghua_AniSet.speedUp(1, 2083);
    this.randomAni();
};

MagicFunc.prototype.randomAni = function() {
    LogCtrl.print("randomAni");
    // 生成1到12的随机数
    var num = Math.ceil(Math.random()*12);
    if (num == 1) {
        this.next_ani = "daijidonghua_AniSet";
        this.daijidonghua_AniSet.startPlay(0, 0);
    }else{
        this.next_ani = "daijidonghua_AniSet";
        this.daijidonghua_AniSet.startPlay(0, 0);
    }
};

MagicFunc.prototype.OnAnimationProgress = function(animation, progress) {
    switch (animation.getName()) {
    }
};

MagicFunc.prototype.OnAnimationRepeat = function(animation) {
    switch (animation.getName()) {
    }
};

MagicFunc.prototype.OnAnimationStart = function(animation) {
    switch (animation.getName()) {
        // 撒红包
        case "hongbaodiao_AniSet":
            this.dahongbao.setVisible(true);
            break;
        // 打招呼
        case "dazhaohu_1_AniSet":
            LogCtrl.print("dazhaohu_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedDZH)=="function"){
                XW3DCtrl.OnAniStartedDZH();
            }
            break;
        // 撒娇
        case "shajiao_1_AniSet":
            LogCtrl.print("shajiao_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedSJ)=="function"){
                XW3DCtrl.OnAniStartedSJ();
            }
            break;
        // 卖萌
        case "maimeng_1_AniSet":
            LogCtrl.print("maimeng_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedMM)=="function"){
                XW3DCtrl.OnAniStartedMM();
            }
            break;
        // 亲亲
        case "qinqin_1_AniSet":
            LogCtrl.print("qinqin_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedQQ)=="function"){
                XW3DCtrl.OnAniStartedQQ();
            }
            break;
        // 跳舞
        case "tiaowu_1_AniSet":
            LogCtrl.print("tiaowu_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedTW)=="function"){
                XW3DCtrl.OnAniStartedTW();
            }
            break;
        // 说话
        case "shuohua_1_AniSet":
            LogCtrl.print("shuohua_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedSH)=="function"){
                XW3DCtrl.OnAniStartedSH();
            }
            break;
        // 撒红包
        case "shahongbao_1_AniSet":
            LogCtrl.print("shahongbao_1_AniSet start");
            if(typeof(XW3DCtrl.OnAniStartedSHB)=="function"){
                XW3DCtrl.OnAniStartedSHB();
            }
            break;
    }
};

MagicFunc.prototype.OnAnimationEnd = function(animation) {
    switch (animation.getName()) {
        // 待机动画
        case "daijidonghua_AniSet":
            if (this.next_ani == "daijidonghua_AniSet") {
                LogCtrl.print("daijidonghua_AniSet end");
                this.randomAni();
            }else if(this.next_ani == "dazhaohu_1_AniSet"){
                // 打招呼
                this.dazhaohu_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "shajiao_1_AniSet"){
                // 撒娇
                this.shajiao_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "maimeng_1_AniSet"){
                // 卖萌
                this.maimeng_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "qinqin_1_AniSet"){
                // 亲亲
                this.qinqin_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "tiaowu_1_AniSet"){
                //跳舞
                this.tiaowu_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "shuohua_1_AniSet"){
                //说话
                this.shuohua_1_AniSet.startPlay(0, 0);
            }else if(this.next_ani == "shahongbao_1_AniSet"){
                //撒红包
                this.shahongbao_1_AniSet.startPlay(0, 0);
            }
            break;
        // 入场动画
        case "ruchang_1_AniSet":
            LogCtrl.print("ruchang_1_AniSet end");
            XW3DCtrl.OnAniEndedRuChang();
            this.overAni();
            break;
        // 打招呼
        case "dazhaohu_1_AniSet":
            LogCtrl.print("dazhaohu_1_AniSet end");
            XW3DCtrl.OnAniEndedDZH();
            this.overAni();
            break;
        // 撒娇
        case "shajiao_1_AniSet":
            LogCtrl.print("shajiao_1_AniSet end");
            XW3DCtrl.OnAniEndedSJ();
            this.overAni();
            break;
        // 卖萌
        case "maimeng_1_AniSet":
            LogCtrl.print("maimeng_1_AniSet end");
            XW3DCtrl.OnAniEndedMM();
            this.overAni();
            break;
        // 亲亲
        case "qinqin_1_AniSet":
            LogCtrl.print("qinqin_1_AniSet end");
            XW3DCtrl.OnAniEndedQQ();
            this.overAni();
            break;
        // 跳舞
        case "tiaowu_1_AniSet":
            LogCtrl.print("tiaowu_1_AniSet end");
            XW3DCtrl.OnAniEndedTW();
            this.overAni();
            break;
        // 跳舞
        case "shuohua_1_AniSet":
            LogCtrl.print("shuohua_1_AniSet end");
            XW3DCtrl.OnAniEndedSH();
            this.overAni();
            break;
        // 撒红包
        case "shahongbao_1_AniSet":
            LogCtrl.print("shahongbao_1_AniSet end");
            this.hongbaodiao_AniSet.startPlay(0, 0);
            break;
        // 大红包
        case "hongbaodiao_AniSet":
            LogCtrl.print("hongbaodiao_AniSet end");
            XW3DCtrl.OnAniEndedSHB();
            this.overAni();
            // 大红包掉落
            this.hongbaodiao_alpha_value.startPlay(0, 0);
            break;
        // 大红包
        case "hongbaodiao_alpha_value":
            LogCtrl.print("hongbaodiao_alpha_value end");
            this.dahongbao.setVisible(false);
            break;
    }
};

MagicFunc.prototype.OnFrameStarted = function(evt) {
    this.faceCamHelper.update();
};

MagicFunc.prototype.OnTouchScreen = function(root, action, id, x, y) {
    this.CalculateFingerProgress(id, action, x, y);
    if (this.OnlyOneFingerTouched) {
        this.RotateObjectWithFinger(this.ObjectEvent, this.FirstFinger.Progress.x);
    }
};

// ========================= 对外接口 =========================
// 入场动画
MagicFunc.prototype.RuChangAni = function() {
    this.ruchang_1_AniSet.startPlay(0, 0);
};
// 不要入场动画
MagicFunc.prototype.NoRuChangAni = function() {
    this.overAni();
};
// 点击头部
MagicFunc.prototype.TouchHead = function() {
    LogCtrl.print("TouchHead");
    if (this.can_ani) {
        this.startAni("dazhaohu_1_AniSet");
    }
};
// 点击脸
MagicFunc.prototype.TouchFace = function() {
    LogCtrl.print("TouchFace");
    if (this.can_ani) {
        this.startAni("shajiao_1_AniSet");
    }
};
// 点击右手
MagicFunc.prototype.TouchYouShou = function() {
    LogCtrl.print("TouchYouShou");
    if (this.can_ani) {
        this.startAni("maimeng_1_AniSet");
    }
};
// 点击左手
MagicFunc.prototype.TouchZouShou = function() {
    LogCtrl.print("TouchZouShou");
    if (this.can_ani) {
        this.startAni("qinqin_1_AniSet");
    }
};
// 点击身体
MagicFunc.prototype.TouchShenTi = function() {
    LogCtrl.print("TouchShenTi");
    if (this.can_ani) {
        this.startAni("tiaowu_1_AniSet");
    }
};
// 点击右脚
MagicFunc.prototype.TouchYouJiao = function() {
    LogCtrl.print("TouchYouJiao");
    if (this.can_ani) {
        this.startAni("shuohua_1_AniSet");
    }
};
// 点击左脚
MagicFunc.prototype.SaHongBao = function() {
    LogCtrl.print("撒红包");
    if (this.can_ani) {
        this.startAni("shahongbao_1_AniSet");
    }
};


function Destroyer(callee) {
    this.callee = callee;
};

Destroyer.prototype.OnDestroy = function() {
    if (this.callee) {
        this.callee.clear();
    }
};

window.postCreateScene = function(root, groupName, groupId) {
    window.magicFunc = new MagicFunc(root, groupName);
    window.magicFunc.init();
    this.destroyer = new Destroyer(magicFunc);
    root.addOnDestroyCallback(destroyer.OnDestroy)
};

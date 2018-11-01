function getAbsoluteUrl(url) {
    var a = document.createElement('A');
    a.href = url;  // 设置相对路径给Image, 此时会发送出请求
    url = a.href;  // 此时相对路径已经变成绝对路径
    return url;
}


function e3dLoadAsset(assetPath, canvas, postJsonCallback, postCreateSceneCallback, version) {
    if (version == undefined) version = 1.0;
    var isCanvasResizeWithParentDom = false;
    var bgAlpha = true;
    $.getJSON(assetPath + '/assets.json?vs=' + version, function (result) {
        switch (result.mode) {
            case '0':
                canvas.style.height = '100%';
                break;//高撑满
            case '1':
                canvas.style.width = '100%';
                break;//宽撑满
            case '2':
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                break;//宽撑满，高撑满
            case '3':
                canvas.style.width = '100%';
                canvas.style.height = '100%';
                isCanvasResizeWithParentDom = true;
                break;
            default:
                canvas.style.height = '100%';
                break;
        }
        var mdesignWid = canvas.width;
        var mdesignHet = canvas.height;
        var me3d = new E3dWallpaperBase(canvas, false, isCanvasResizeWithParentDom, mdesignWid, mdesignHet, bgAlpha);
        me3d.start();
        me3d.loadAsset(assetPath, null, function () {
            postCreateSceneCallback(me3d);
        }, version);
        postJsonCallback(result, me3d);

    });
}
function LogController(){
    /*
    自定义工厂方法：log打印
    */
    var self=this;

    /*
    是否开启打印
    */
    self.IsLog = false;

    /*
    自定义方法：打印log
    print(ctx)
        :parms:ctx              内容
    */
    self.print = function(ctx) {
        if(self.IsLog){
            console.log(ctx);
        }
    };
}

var LogCtrl = new LogController();


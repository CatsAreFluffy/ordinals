function succ(x){
    return {type:"successor",pred:x,toString:function(){return this.pred.type=="zero"?"1":this.pred.toString()+"+1"}}
}
function finite(x){
    return x==0?{type:"zero",toString:function(){return "0"}}:succ(finite(x-1))
}
function cnf(x){
    if(x.constructor!=[].constructor){x=Array.prototype.slice.call(arguments)}
    return cnfclean({type:"cnf",values:x,seq:
        function(x){
            var self=Object.assign({},this)
            if(x==0){
                self.vales.pop()
                return self
            }else{
                if(self.values[self.values.length-1].type="successor"){
                    var temp=Array(x).fill(self.values.pop())
                    self.values.concat(temp)
                    return cnfclean(self)
                }else{
                    self.values[self.values.length-1].seq(x)
                    return cnfclean(self)
                }
            }
        },toString:
        function(){
            return "w^("+this.values.join(")+w^(")+")"
        }
    })
}
function cnfclean(x){
    console.log(x)
    if(x.values[x.values.length-1].type=="zero"){
        x.values.pop()
        return succ(x)
    }else{
        return x
    }
}
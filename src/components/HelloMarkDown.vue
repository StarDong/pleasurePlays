<template>
  <div
    class="md_root_content"
    v-bind:style="{ width: this.width, height: this.height }"
  >
    <!--功能按钮区-->
    <div class="button_bar">
      <!-- <span v-on:click="addBold"><B>B</B></span>
      <span v-on:click="addItalic"><B>I</B></span> -->
      <span v-on:click="addH1"><B>h1</B></span>
      <span v-on:click="addH2"><B>h2</B></span>
      <span v-on:click="addtext"><B>T</B></span>
      <!-- <span v-on:click="addselect"><B>S </B></span> -->
      <!-- <span v-on:click="addCode"><B>C</B></span> -->
      <span v-on:click="roletype('left')"><B>L</B></span>
      <span v-on:click="roletype('right')"><B>R</B></span>
      <span v-on:click="insert"><B>IN</B></span>
    </div>

    <!--主要内容区-->
    <div class="content_bar">
      <!--markdown编辑器区-->
      <div class="markdown_body">
        <textarea
          ref="ref_md_edit"
          class="md_textarea_content"
          v-model="markString"
        >
        </textarea>
      </div>

      <!--解析成html区-->
      <div class="html_body">
        <p
          v-html="htmlString"
          :class="htmlString ? 'markdowneditContent' : 'test'"
        ></p>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked"; //解析mardown语法的库
import hljs from "highlight.js"; //对代码进行语法高亮的库
//   import testData from '../testData'  //测试数据
export default {
  name: "HelloMarkDown",
  props: {
    width: {
      type: String,
      default: "1000px"
    },
    height: {
      type: String,
      default: "600px"
    }
  },
  data() {
    return {
      markString: "",
      htmlString: ""
    };
  },
  mounted() {
    this.markString = "";
  },
  methods: {
    //加粗
    addBold() {
      this.changeSelectedText("**粗体", "**");
    },
    //斜体
    addItalic() {
      this.changeSelectedText("***斜体", "***");
    },
    //加下划线
    addUnderline() {
      this.changeSelectedText("<u>", "</u>");
    },
    addH1() {
      this.changeSelectedText("# 一级标题", "");
    },
    addH2() {
      this.changeSelectedText("##  二级标题", "");
    },
    addtext() {
      this.changeSelectedText("> 段落文本", "");
    },
    changeImage() {
      this.changeSelectedText(
        "![](https://file.boxuegu.com/9ab3ad75b008432a987715a1ecd29854.png)",
        ""
      );
    },
    addCode() {
      this.changeSelectedText(
`javascript 
function a(){
  return b
}
`,'');
    },
    addselect() {
      this.changeSelectedText(
`选择题
+ [x] 选项A
答案解析：
+ [ ]  选项b
答案解析：
+ [ ]  选项c
答案解析：
+ [ ]  选项d
答案解析：`,
        ""
      );
    },
    roletype(type){
      if(type=='left'){
        this.changeSelectedText("<section data-direction='left'>--我是左侧对话--", "</section>");
      }else{
        this.changeSelectedText("<section data-direction='right'>--我是右侧对话--", "</section>");
      }

    },
    //一键插入
    insert(){
      let dom = document.getElementsByClassName('markdowneditContent')[0].childNodes
      let newArr = []
      let json = []
      // 过滤空文本标签
      let roleType = '1'
      for(let i=0;i<dom.length;i++){
         try{
             let obj = {}
            if(dom[i].nodeName!= "#text"){
               const nodeName = dom[i].nodeName
                switch(nodeName){
                  case 'P':
                    obj.type = 'text'
                    obj.content = dom[i].innerText
                    obj.roleType = '1'
                    newArr.push(obj)
                    continue;
                  case 'BLOCKQUOTE':
                    obj.type = 'text'
                    obj.content = dom[i].innerText
                    obj.roleType = '2'
                    newArr.push(obj)
                    continue;
                  case 'H1':
                    obj.type = 'h1'
                    obj.content = dom[i].innerText
                    newArr.push(obj)
                    continue;
                }
            } else{
            }   
          }catch(e){
              console.log(e)
          }     
      }
      console.log('newArr',newArr)
    },

    changeSelectedText(startString, endString) {
      let t = this.$refs.ref_md_edit;
      if (window.getSelection) {
        if (t.selectionStart != undefined && t.selectionEnd != undefined) {
          let str1 = t.value.substring(0, t.selectionStart);
          let str2 = t.value.substring(t.selectionStart, t.selectionEnd);
          let str3 = t.value.substring(t.selectionEnd);
          console.log(str1, str2, str3);
          let result = str1 + startString + str2 + endString + str3;
          console.log("result", result);
          t.value = result;
          this.markString = t.value;
        }
      }
    }
  },
  watch: {
    //监听markString变化
    markString: function(value) {
      marked.setOptions({
        renderer: new marked.Renderer(),
        gfm: true,
        tables: true,
        breaks: true,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false
      });
      this.htmlString = marked(value);
    },
    //监听htmlString并对其高亮
    htmlString: function(value) {
      this.$nextTick(() => {
        const codes = document.querySelectorAll(".html_body pre code");
        // elem 是一个 object
        codes.forEach(elem => {
          elem.innerHTML =
            "<ul><li>" +
            elem.innerHTML.replace(/\n/g, "\n</li><li>") +
            "\n</li></ul>";
          hljs.highlightBlock(elem);
        });
      });
    }
  }
};
</script>
<style lang="less" scoped>
.md_root_content {
  display: flex;
  display: -webkit-flex;
  flex-direction: column;
  .button_bar {
    width: 100%;
    height: 40px;
    background-color: #d4d4d4;
    display: flex;
    display: -webkit-flex;
    align-items: center;
    span {
      width: 30px;
      line-height: 40px;
      text-align: center;
      color: orange;
      cursor: pointer;
    }
  }
  .content_bar {
    display: flex;
    display: -webkit-flex;
    width: 100%;
    height: 100%;
    .markdown_body {
      width: 50%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      .md_textarea_content {
        flex: 1;
        height: 100%;
        padding: 12px;
        overflow: auto;
        box-sizing: border-box;
        resize: none;
        outline: none;
        border: none;
        background-color: #f4f4f4;
        font-size: 14px;
        color: #232323;
        line-height: 24px;
      }
    }
    .html_body {
      width: 50%;
      height: 100%;
      display: flex;
      display: -webkit-flex;
      background-color: #dfe9f1;
      .markdowneditContent {
        width: 100%;
        overflow-y: scroll;
      }
    }
  }
}
</style>
<style lang="less">
.markdowneditContent {
  p{
    padding: 20px 20px 44px;
    background: #2e3251;
    border-radius: 0 40px 40px 40px;
    color: #fff;
    margin: 20px;
  }
  blockquote {
    padding: 20px 20px 44px;
    background: #2e3251;
    border-radius: 40px 0px 40px 40px;
    color: #fff;
    p{
      padding:0;
    }
  }
  p {
    img {
      width: 300px;
      height: 200px;
    }
  }
}
</style>

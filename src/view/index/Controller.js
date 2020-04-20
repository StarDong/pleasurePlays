import { XButton } from 'vux'
// import VmEditor from '@/components/editor/vm-editor.vue'
import HelloMarkDown from '@/components/HelloMarkDown.vue'
export default {
    data() {
        return {
            listData: [1, 2, 3, 4],
            previewHtml: '',
            value: "",
            toolbars: {
                bold: true, // 粗体
                italic: true, // 斜体
                header: true, // 标题
                imagelink: true,
            }
        }
    },
    components: {
        XButton,
        HelloMarkDown
        // VmEditor
    },
    methods: {
        showHtml: function(data) {
            console.log(data)
            this.previewHtml = data
        }
    }
}
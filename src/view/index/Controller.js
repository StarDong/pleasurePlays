import { XButton } from 'vux'
import VmEditor from '@/components/editor/vm-editor.vue'

export default {
    data () {
        return {
            listData: [1, 2, 3, 4],
            previewHtml: ''
        }
    },
    components: {
        XButton,
        VmEditor
    },
    methods: {
        showHtml: function (data) {
            console.log(data)
            this.previewHtml = data
        }
    }
}

<template>
  <div class="hello">
    <group>
      <cell title="title" value="value"></cell>
    </group>
    <x-button type="primary">primary</x-button>
    <x-button type="warn">Delete</x-button>
  </div>
</template>

<script>
import { Group, Cell, XButton } from 'vux'
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    Group,
    Cell,
    XButton
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.hello {
  text-align: left;
}
</style>

<template>
  <div class="home">
    <LifeCycleParent msg="LifeCycleParent"/>
  </div>
</template>

<script>
// @ is an alias to /src
import LifeCycleParent from '@/components/LifeCycleParent.vue';


export default {
  name: 'home',
  components: {
    LifeCycleParent
  }
}
</script>

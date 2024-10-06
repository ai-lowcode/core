<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

defineOptions({
  name: 'Redirect',
})

const route = useRoute()
const router = useRouter()

onMounted(() => {
  const path = `/${route.params.path}` as string
  router.replace({ path })
})
</script>

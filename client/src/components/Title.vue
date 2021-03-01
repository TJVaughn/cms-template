<template>
    <div>
        <title>{{ msg }}</title>

    </div>
</template>

<script>
import getMetaData from './getMetaData'

export default {
    name: 'ApiHello',
    data () {
        return {
            msg: null
        }
    },
    async mounted() {
        let res = await getMetaData()
        console.log(res);
        this.msg = res
    }
}
</script>
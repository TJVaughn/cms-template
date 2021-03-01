<template>
    <title>{{ msg }}</title>
</template>

<script>
import { getApiData } from './GetApiData'

export default {
    name: 'ApiHello',
    data () {
        return {
            msg: null
        }
    },
    async mounted() {
        let res = await getApiData()
        console.log(res);
        this.msg = res
    }
}
</script>
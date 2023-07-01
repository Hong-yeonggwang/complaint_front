<template>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Cafeteria
                </th>
                <th class="text-left">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
            </tr>
        </tbody>
    </v-table>
    <v-table>
        <thead>
            <tr>
                <th class="text-left">
                    Bus route
                </th>
                <th class="text-left">
                    Price
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="item in desserts" :key="item.name">
                <td>{{ item.name }}</td>
                <td>{{ item.price }}</td>
            </tr>
        </tbody>
    </v-table>
</template>

<script>
export default {
    name: 'buyPage',
    components: {
    },
    data() {
        return {
            desserts: [
                {
                    name: 'Frozen Yogurt',
                    price: 159,
                },
                {
                    name: 'Ice cream sandwich',
                    price: 237,
                },
                {
                    name: 'Eclair',
                    price: 262,
                },
                {
                    name: 'Cupcake',
                    price: 305,
                },
                {
                    name: 'Gingerbread',
                    price: 356,
                },
                {
                    name: 'Jelly bean',
                    price: 375,
                },
                {
                    name: 'Lollipop',
                    price: 392,
                },
                {
                    name: 'Honeycomb',
                    price: 408,
                },
                {
                    name: 'Donut',
                    price: 452,
                },
                {
                    name: 'KitKat',
                    price: 518,
                },
            ],
        }
    },
}
</script>

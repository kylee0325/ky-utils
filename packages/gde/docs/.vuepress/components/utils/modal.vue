<template>
    <g-modal
        :maskClosable="false"
        width="960px"
        :title="modalTitle"
        :visible="visible.value"
        :okButtonProps="{ props: { loading } }"
        @cancel="handleModalCancel"
        @ok="handleModalOk"
        :afterClose="afterClose"
    >
        <g-table
            :columns="columns"
            :row-selection="{
                selectedRowKeys,
                onChange: handleSelect,
            }"
            :data-source="tableData.list"
            :loading="tableData.loading"
            rowKey="id"
        >
            <template slot="action" slot-scope="text, record, index">
                <g-button type="primary" @click="handleSelectItem(text, record, index)">
                    选择
                </g-button>
            </template>
        </g-table>
    </g-modal>
</template>
<script>
import { defineComponent, ref, reactive, unref } from '@vue/composition-api';
import { mixins } from '@gde/utils';

export default defineComponent({
    mixins: [mixins.modalMixin],
    setup(props) {
        console.log('🚀 ~ setup ~ props', props);
        const loading = ref(false);
        const modalTitle = ref('选择商品');
        const tableData = reactive({
            list: [
                {
                    id: 1,
                    skuName: '1',
                    price: 120,
                },
                {
                    id: 2,
                    skuName: '2',
                    price: 200,
                },
            ],
            total: 0,
        });

        const columns = [
            {
                title: '商品',
                key: 'skuName',
                dataIndex: 'skuName',
                width: 250,
            },
            {
                title: '售价',
                key: 'price',
                dataIndex: 'price',
            },
            {
                title: '操作',
                dataIndex: 'action',
                key: 'action',
                scopedSlots: { customRender: 'action' },
                width: 100,
            },
        ];

        const selectedRowKeys = ref([]);
        const selectedRows = ref([]);

        const handleSelect = (changableRowKeys, changableRows) => {
            selectedRowKeys.value = changableRowKeys;
            selectedRows.value = changableRows;
        };

        const handleSelectItem = (text, record) => {
            console.log('🚀 ~ handleSelectItem ~ text, record', text, record);
        };

        const handleModalCancel = () => {
            props.cancel();
        };

        const handleModalOk = async () => {
            loading.value = true;
            await props.ok(unref(selectedRows));
            loading.value = false;
        };

        return {
            loading,
            modalTitle,
            columns,
            tableData,
            selectedRowKeys,
            handleSelect,
            handleModalOk,
            handleModalCancel,
            handleSelectItem,
        };
    },
});
</script>

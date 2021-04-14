<template>
    <div>
        <!--Form add device-->
        <div class="row">
        <card>
            <div slot="header"> 
            <h4 class="card-tittle">Devices</h4>
            </div>
            <div class="row">
                <div class="col-4">
                    <base-input label="Device name" type="text" placeholder="Name*"></base-input>
            </div>         
                <div class="col-4">
                    <base-input label="Serial number" type="text" placeholder="Serial Number*"></base-input>
            </div>    
                 <div class="col-4">
                    <slot name="label"> 
                        <label> Device type</label>
                    </slot>

                    <el-select value="1" placeholder="Select type*" style="width:100%">
                        <el-option class="text-dark" value="Type 1" label="Type 1"></el-option>
                        <el-option class="text-dark" value="Type 2" label="Type 2"></el-option>
                        <el-option class="text-dark" value="Type 3" label="Type 3"></el-option>
                    </el-select>
            </div>   
                   
            </div>
            <div class="row pull-right" >
                <div class="col-12" >
                    <base-button type="primary" class="mb-3" size="lg" >Add</base-button>   
                </div>
            </div>
        </card>
        </div>

        <!--table device-->
        <div class="row">
            <card>
                <div slot="header"> 
                <h4 class="card-tittle">Devices list</h4>
               </div>

               <el-table :data="devices">
                    <el-table-column label="#" min-width="50" allign="center">
                        <div slot-scope="{row, $index}">
                            {{$index+1}}
                        </div>
                    </el-table-column>

                    <el-table-column label="Name" prop="name"></el-table-column>
                    <el-table-column label="Device ID"  prop="dId"></el-table-column>
                    <el-table-column label="Device Type"  prop="templateName"></el-table-column>

                    <el-table-column label="Actions">
                        <div slot-scope="{row, $index}">
                            <el-tooltip content="Save status indicator">
                                <i class="fas fa-database" :class="{'text-success' : row.saveStatus,'text-dark' : !row.saveStatus}"></i>
                            </el-tooltip>
                            <el-tooltip content="Save Data">
                                <base-switch @click="updateSaveStatus($index)" :value= "row.saveStatus" type="primary" on-text="on" off-text="off" ></base-switch>
                            </el-tooltip>
                            <el-tooltip content="Delete" effect="light" :open:delay="300" placement="top">
                            <base-button type="danger" icon size="small" class="btn-link" @click="deleteDevice(row)">
                            <i class="tim-icons icon-simple-remove"></i>
                            </base-button>
                        </el-tooltip>
                        </div>
                   </el-table-column>

               </el-table>
            </card>            
        </div>
        <Json :value="devices"></Json>
    </div>
</template>

<script>
import { Table, TableColumn } from 'element-ui';
import { Select, Option } from 'element-ui';
import BaseButton from '../components/BaseButton.vue';
export default{
    components: {
        [BaseButton.name]:BaseButton,
        [Table.name]: Table,
        [TableColumn.name]: TableColumn,
        [Option.name]: Option,
        [Select.name]: Select,   

    },
    data(){
        return{
            devices: [
                {
                    name: "home",
                    dId:"888",
                    templateName:"Powermeter",
                    templateId: "123",
                    saveStatus:false
                },
                                {
                    name: "office",
                    dId:"888",
                    templateName:"Powermeter",
                    templateId: "123",
                    saveStatus:true
                },
                {
                    name: "factory",
                    dId:"880",
                    templateName:"Powermeter",
                    templateId: "123",
                    saveStatus:false
                }
            ]
        };
    },
    methods: {
    deleteDevice(rowDevice){
        alert("DELETING" + rowDevice.name)
        },
    updateSaveStatus(index){
        this.devices[index].saveStatus = !this.devices[index].saveStatus

    }    
    }
};
</script>

<template>
  <div class="q-pa-xl">
    <div class="q-pa-md text-center text-h2">
      Why Us
    </div>
    <div class=" text-center text-grey text-body1">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    </div>
    <div class="row justify-center q-gutter-md">
      <div class="col-md-3 col-sm-12 col-xs-12 mtt-70" v-for="(service,index) in services" :key="index">
        <q-card class="services-card text-primary shadow-20">
          <div class="">
            <q-icon class="service-icon service-icon-top text-center text-primary" size="8em" :name="service.icon" style="" />
            <q-card-section class="services-card-section w-100" style="">
              <div class="col text-center ">
                <q-icon class="service-icon text-center" :name="service.icon" />
                <div class="text-body1"> {{service.desc}}</div>
              </div>
            </q-card-section>
          </div>
        </q-card>
      </div>
    </div>
  </div>
</template>
<script>
export default
{
  // name: 'ComponentName',
  data()
  {
    return {
      services: [
      {
        title: 'Key/Consultancy for setting up complete plants ',
        icon: 'fas fa-address-card',
        to: '',
        desc: 'desc 1'
      },
      {
        title: 'Melting and casting plants for copper and copper alloys',
        icon: 'fas fa-hard-hat',
        to: '',
        desc: 'desc 2'
      },
      {
        title: 'Non Ferrous Rolling Plants',
        icon: 'fas fa-toolbox',
        to: '',
        desc: 'desc 3'
      },
      {
        title: 'Extrusion plants for copper & copper alloy product',
        icon: 'fas fa-hammer',
        to: '',
        desc: 'desc 4'
      },
      {
        title: 'Engineering Services',
        icon: 'fas fa-tools',
        to: '',
        desc: 'desc 5'
      }, ],
    }
  }
}

</script>

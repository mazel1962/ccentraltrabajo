<template>
  <div class="grid grid-rows-2 grid-cols-12 gap-0">  
    <div class="bg-yellow-400 row-start-1 row-end-3 h-32 col-start-1 col-end-3">01</div>
    <div class="bg-yellow-400 row-start-1 row-end-2 h-16 col-start-3 col-end-11">02</div>
    <div class="bg-yellow-100 row-start-2 row-end-3 h-16 col-start-3 col-end-11">03</div>
    <div class="bg-yellow-400 text-neutral-900 row-start-1 row-end-3 h-32 col-start-11 col-end-13">
      <div class="grid grid-rows-4 grid-cols-6 gap-0 bg-yellow-400 text-neutral-900">
        <!-- <input class="input" onKeyUp="if(this.value>9){this.value='9';}else if(this.value<0){this.value='0';}" v-model.number="numero" type="number">     -->
        <div class="bg-yellow-400 text-neutral-900 row-start-2 row-end-3 col-start-2 col-end-4 h-8">Usuario</div>
        <div class="bg-yellow-400 text-neutral-900 row-start-2 row-end-3 col-start-4 col-end-6 h-8"><input type="text" size = "10" v-model="idUsuario" placeholder="Usuario"></div>
        <div class="bg-yellow-400 text-neutral-900 row-start-3 row-end-4 col-start-2 col-end-4 h-8">Contraseña</div>
        <div class="bg-yellow-400 text-neutral-900 row-start-3 row-end-4 col-start-4 col-end-6 h-8"><input type="text" size = "10" v-model="pwUsuario" placeholder="Contraseña"></div>
        <div class="bg-sky-900 text-plata text-center row-start-4 row-end-5 col-start-3 col-end-5 h-8"><button class= "boton" @click="ValidaUsuario()">Ingresar</button></div>
 
 
        <!-- <p>{{userStore.identificadorUsuario}}</p>
        <p>{{userStore.passwordUsuario}}</p> -->

</div>
    </div>
  </div>

<div class="bg-yellow-400 row-start-5 row-end-5 col-start-1 h-4 w-full col-end-13">05</div>   
  <div class="grid grid-cols-12 gap-0">
    <div class="bg-sky-900 row-start-1  text-plata h-32 col-start-1 h-[683px] col-end-3">
       <div id="elemento">
          <nav>
             <ul>
                <li v-for="Item of ItemMenu2" >
                    <!-- <router-link :to="{name:'Item.link'}">{{Item.nombre}}</router-link> -->
                    <!-- <router-link :to="{name:'Uno'}">{{Item.nombre}}</router-link> -->
	                  <router-link v-bind:to="'/views/'+Item.link">{{Item.nombre}}</router-link>
                </li>
              </ul>
          </nav>
        </div>
      </div> 
    <div class="bg-plata row-start-1 h-32 col-start-3 h-[683px] col-end-13">
         <router-view></router-view></div>   
  </div>

  <!-- <div class="grid grid-rows-1 grid-cols-12">
    <div class="bg-emerald-900 row-span-1 h-[700px] col-span-2">05</div>
    <div class="bg-plata row-span-1 h-[700px] col-span-10">06</div>
  </div>  -->
 
   <div class="grid grid-cols-12 gap-0">
    <div class="bg-sky-900 text-plata row-start-1 row-end-3 col-start-1 h-32 w-full col-end-13">
        <!-- <div class = "imagen"> -->
          <img alt = "logo " src="./assets/logo.png" />
          <label Empresa v-bind="attribs" > </label>

        <!-- </div> -->
    </div> 
  </div>

  <!-- <div class="grid grid-rows-1 grid-cols-12">
    <div class="absolute bottom-0 bg-emerald-900 row-span-1 h-32 w-full col-span-12">09</div>
  </div> -->
</template>


<script setup>
   import { ref } from 'vue';
   import { useUserStore } from './stores/user';
   import ItemMenu2 from './mock/datos.js';
// import { analyzeMetafile } from 'esbuild';

   const idUsuario = ref('');
   const pwUsuario = ref('');

   const userStore = useUserStore()

   const ValidaUsuario = () => {
       console.log(idUsuario.value)
       console.log(pwUsuario.value)
       userStore.registerUsuario(idUsuario.value,pwUsuario.value)
       console.log(userStore.identificadorUsuario)
       console.log(userStore.nombreUsuario)
   }
   const attribs = ref({
     msg: "Valles Unidos",
   });
</script>

<style>
*{
  margin: 0;
};

.container {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 30px;
  margin-left: 30px;
   margin-bottom: 50px;
  /* width: 800px; */

  /* margin: 20px auto 0; */
}

.imagen {
  
  /* display: block; */
  /* background-color: #0ecc30; */
  margin-top: 10px;
  margin-left: 50px;
   margin-bottom: 10px;
  /* width: 800px; */

  /* margin: 20px auto 0; */
}
.botones {
  
  display: block;
  /* background-color: #0ecc30; */
  margin-top: 30px;
  padding: 30px 20px 20px 100px ;
  margin-bottom: 10px;

}
.boton:hover {
      background-color:rgb(3, 105, 161);
      /* color: rgb(250, 204, 21); */
      color: rgb(255, 255, 255);
      /* text-shadow: 1px 1px #fff; */
      transition: 0.7s;
}

  /* width: 800px; */

input[type=text] {
  /* width: 100%;
  padding: 12px 20px;
  margin: 8px 0; */
  box-sizing: border-box;
  border: 1px solid rgb(212 212 216);
  -webkit-transition: 0.5s;
  transition: 0.5s;
  outline: none;
}
input[type=text]:focus {
  background-color:rgb(201, 200, 200);
}

</style>
<template>
  <div class="container">
    <div class="accordion accordion-flush" id="accordionFlushExample">
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
            1. Creamos el conjunto&nbsp;<i>A</i>
          </button>
        </h2>
        <div id="flush-collapseOne" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El conjunto <i>A</i> puede estar formado por tan solo de 4 a 7 elementos. Además, los elementos válidos pueden ser letras o números, más no símbolos.</p>
              <form class="row g-3">
                <div class="col-md-1">
                  <input
                    type="text"
                    class="form-control"
                    onkeydown="if (['Space'].includes(arguments[0].code)) return false;"
                    v-model="e"
                  >
                </div>
                <div class="col-md-11">
                  <button 
                    type="button" 
                    class="btn btn-primary me-2" 
                    @click="buildSet_A(option.manual)"
                    :disabled="A.length == 7"  
                  >Añadir</button>
                  <button type="button" class="btn btn-success" @click="buildSet_A(option.automatic)">Generar elementos</button>
                </div>
              </form>
            </section>

            <section>
              <div style="margin-top: 25px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in A" :key="index">
                  <span class="badge bg-dark">{{ element }}</span>
                  <template v-if="index != A.length - 1"> ; </template>
                </template>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
            2. Obtenemos el producto cartesiano&nbsp;<i>AxA</i>
          </button>
        </h2>
        <div id="flush-collapseTwo" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema va calculando los elementos del producto cartesiano <i>AxA</i> dinámicamente a partir de los elementos del conjunto <i>A</i>.</p>
            </section>

            <section>
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in AxA" :key="index">
                  ( <span class="badge bg-dark">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != AxA.length - 1"> ; </template>
                </template>
                }
              </div>
            </section>
          </div>
        </div>
      </div>
      <div class="accordion-item">
        <h2 class="accordion-header">
          <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
            3. Generamos una relación&nbsp;<i>A R A</i>
          </button>
        </h2>
        <div id="flush-collapseThree" class="accordion-collapse collapse" data-bs-parent="#accordionFlushExample">
          <div class="accordion-body">
            <section>
              <p>El sistema selecciona elementos aleatoriamente del producto cartesiano <i>AxA</i> para poder formar <i>A R A</i>. 
                 Esto lo hace dinámicamente cada que el producto cartesiano cambie en el contenido del conjunto.
              </p>
            </section>

            <section>
              <div style="margin-top: 20px; margin-bottom: 15px; font-size: 20px; text-align: center;">
                {
                <template v-for="(element, index) in aRa" :key="index">
                  ( <span class="badge bg-dark">{{ element[0] }} ; {{ element[1] }}</span> )
                  <template v-if="index != aRa.length - 1"> ; </template>
                </template>
                }
              </div>
              
              <div style="margin-top: 25px; text-align: center;">
                <button class="btn btn-primary" @click="buildSet_aRa">
                  <i class="bi bi-arrow-clockwise"></i> Refrescar
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  getRandom, 
  isReflexive, 
  isIrreflexive 
} from '../assets/functions';

export default {
  data() {
    return {
      option: {
        manual: false,
        automatic: true
      },
      A: [],
      AxA: [],
      aRa: [],
      e: ''
    }
  },
  watch: {
    'A' () {
      if (this.A.length >= 4 && this.A.length <= 7) {
        this.buildSet_AxA();
      }
    },

    'AxA' () {
      if (this.AxA.length > 0)
        this.buildSet_aRa();
    }
  },
  methods: {
    buildSet_A(isAutomatic) {
      if (isAutomatic) {
        this.addAutomatic();
        return;
      }

      this.addManual();
    },

    buildSet_AxA() {
      this.AxA = [];
      let pair = {};

      for (let i = 0; i < this.A.length; i++) {
        for (let j = 0; j < this.A.length; j++) {
          pair[0] = this.A[i];
          pair[1] = this.A[j];
          this.AxA.push(pair);
          pair = {};
        }
      }
    },

    buildSet_aRa() {
      this.aRa = [];
      let nR = getRandom(1, this.AxA.length);

      for (let i = 0; i < nR; i++) {
        this.aRa.push(this.AxA[getRandom(0, (this.AxA.length) - 1)]);
      }

      /* Eliminamos elementos repetidos y convertimos nuevamente a arreglo */
      const dataSet = new Set(this.aRa);
      this.aRa = [...dataSet];

      // this.classifyRelation();
    },

    classifyRelation() {
      if (isReflexive(Atest, aRaTest)) this.msg = 'La relación es reflexiva.';
      if (isIrreflexive(Atest, aRaTest)) this.msg = 'La relación es irreflexiva.';
    },

    addManual() {
      if (this.A.length == 7) return;

      /* Verificación para que el elemento no se repita */
      for (let i = 0; i < this.A.length; i++) {
        if (this.A[i] == this.e) return;
      }

      if (parseInt(this.e) >= 0) {
        this.A.push(parseInt(this.e));
        this.buildSet_AxA();
        return;
      }

      if ((/[a-zA-Z]/).test(this.e) && this.e.length == 1) {
        this.A.push(this.e);
        this.buildSet_AxA();
        return;
      }

      alert('¡Por favor, ingrese solo números o 1 letra!');
    },

    addAutomatic() {
      let n = getRandom(4, 7);
      this.A = [];

      for (let i = 0; i < n; i++) {
        if (getRandom(0, 1)) 
          this.A.push(getRandom(0, 20));
        else 
          this.A.push(String.fromCharCode(getRandom(97, 122)));
      }
    },
  }
}
</script>
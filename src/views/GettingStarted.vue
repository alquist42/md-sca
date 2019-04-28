<template>
  <v-app light>
    <v-content>
      <v-container fluid fill-height>
        <v-layout row wrap align-center justify-center fill-height>
          <v-flex xs12 sm8 md4>
            <v-window v-model="step">
              <v-window-item
                v-for="(question, n) in questions"
                :key="`page-${n}`"
                :value="n"
              >
                <div class="primary--text title font-weight-regular">
                  <h3 class="title font-weight-light mb-2">
                    {{ question.title }}
                  </h3>
                  <span class="caption primary--text">{{
                    question.caption
                  }}</span>
                  <v-form :ref="question.name" @submit="prevent">
                    <v-text-field
                      color="blue"
                      :rules="question.rules"
                      v-if="question.type == 'text'"
                      v-model="answers[question.name]"
                      box
                      :label="
                        question.name.charAt(0).toUpperCase() +
                          question.name.slice(1)
                      "
                      required
                    />
                  </v-form>
                </div>

                <v-btn
                  class="ml-0"
                  color="primary"
                  v-if="step < questions.length - 1"
                  depressed
                  @click="next"
                >
                  next
                </v-btn>
                <v-btn
                  class="ml-0"
                  color="primary"
                  v-if="step === questions.length - 1"
                  depressed
                  @click="finish"
                >
                  complete and get free Insurance
                </v-btn>
              </v-window-item>
            </v-window>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
const rules = {
  required: value => !!value || "Required.",
  counter: value => (!!value && value.length >= 2) || "Min 2 characters"
};

export default {
  data: () => ({
    questions: [
      {
        name: "firstname",
        type: "text",
        label: "Your first name",
        rules: [rules.required, rules.counter],
        title: "What is your first name?"
      },
      {
        name: "lastname",
        type: "text",
        label: "Your last name",
        rules: [rules.required, rules.counter],
        title: "What is your last name?"
      }
    ],
    answers: {},
    step: 0
  }),

  methods: {
    next() {
      if (this.$refs[this.questions[this.step].name][0].validate()) {
        this.step++;
      }
    },
    finish() {
      if (
        this.$refs[this.questions[this.questions.length - 1].name][0].validate()
      ) {
        this.$store.dispatch("updateProfile", { ...this.answers });
        this.$router.push({ name: "profile" });
      }
    },
    prevent(e) {
      e.preventDefault();
    }
  }
};
</script>

export default {
  props: {
    to: { type: String, required: true },
    tag: { type: String },
  },
  methods: {
    handler() {
      this.$router.push(this.to);
    },
  },
  render() {
    let tag = this.tag || "a";
    return <tag onClick={this.handler}>{this.$slots.default}</tag>;
  },
};

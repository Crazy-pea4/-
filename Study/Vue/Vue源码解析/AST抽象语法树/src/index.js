import parse from "./js/parse";

const template = `<div>
      <h3 class="title sTitle" id="t">hello</h3>
      <ul>
        <li>1</li>
        <li>2%%</li>
        <li>3</li>
      </ul>
</div>`;

const str = parse(template);

console.log(str);

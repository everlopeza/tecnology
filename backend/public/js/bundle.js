(()=>{"use strict";var e=["second","minute","hour","day","week","month","year"],t=["秒","分钟","小时","天","周","个月","年"],n={},o=function(e,t){n[e]=t},a=[60,60,24,7,365/7/12,12];function s(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}o("en_US",(function(t,n){if(0===n)return["just now","right now"];var o=e[Math.floor(n/2)];return t>1&&(o+="s"),[t+" "+o+" ago","in "+t+" "+o]})),o("zh_CN",(function(e,n){if(0===n)return["刚刚","片刻后"];var o=t[~~(n/2)];return[e+" "+o+"前",e+" "+o+"后"]}));const r=new class{constructor(){this.URI="http://127.0.0.1:3000/api/books"}async getBooks(){const e=await fetch(this.URI);return await e.json()}async postBook(e){const t=await fetch(this.URI,{method:"POST",body:e}),n=await t.json();console.log(n)}async deleteBook(e){const t=await fetch(`${this.URI}/${e}`,{headers:{"Content-Type":"application/json"},method:"DELETE"}),n=await t.json();console.log(n)}},d=class{async renderBooks(){const e=await r.getBooks(),t=document.getElementById("books-cards");t.innerHTML="",e.forEach((e=>{const o=document.createElement("div");var r,d,c,i;o.className="",o.innerHTML=`\n                <div class="card m-2">\n                    <div class="row">\n                        <div class="col-md-4">\n                            <img src="http://127.0.0.1:3000${e.imagePath}" alt="" class="img-fluid">\n                        </div>\n                        <div class="col-md-8">\n                            <div class="card-block px-2">\n                                <h4 class="card-title">${e.title}</h4>\n                                <p class="card-text">${e.author}</p>\n                                <a href="#" class="btn btn-danger delete" _id="${e._id}"> X </a>\n                            </div>\n                        </div>\n                \n                    </div>\n                    <div class="card-footer">\n                        ${r=e.created_at,i=function(e,t){return(+(t?s(t):new Date)-+s(e))/1e3}(r,c&&c.relativeDate),function(e,t){for(var n=e<0?1:0,o=e=Math.abs(e),s=0;e>=a[s]&&s<a.length;s++)e/=a[s];return(e=Math.floor(e))>(0==(s*=2)?9:1)&&(s+=1),t(e,s,o)[n].replace("%s",e.toString())}(i,function(e){return n[e]||n.en_US}(d))}\n                    </div>\n                \n                </div>\n            `,t.appendChild(o)}))}async addANewBook(e){await r.postBook(e),this.clearBookForm(),this.renderBooks()}clearBookForm(){document.getElementById("book-form").reset()}renderMessage(e,t,n){const o=document.createElement("div");o.className=`alert alert-${t} message`,o.appendChild(document.createTextNode(e));const a=document.querySelector(".col-md-4"),s=document.querySelector("#bookform");a.insertBefore(o,s),setTimeout((()=>{document.querySelector(".message").remove()}),n)}async deleteBook(e){await r.deleteBook(e),this.renderBooks()}};document.addEventListener("DOMContentLoaded",(()=>{(new d).renderBooks()})),document.getElementById("book-form").addEventListener("submit",(e=>{const t=document.getElementById("title").value,n=document.getElementById("author").value,o=document.getElementById("isbn").value,a=document.getElementById("image").files,s=new FormData;s.append("image",a[0]),s.append("title",t),s.append("author",n),s.append("isbn",o);const r=new d;r.addANewBook(s),r.renderMessage("New Book Added","success",3e3),e.preventDefault()})),document.getElementById("books-cards").addEventListener("click",(e=>{if(e.target.classList.contains("delete")){const t=new d;t.deleteBook(e.target.getAttribute("_id")),t.renderMessage("Book Removed","danger",3e3)}e.preventDefault()}))})();
//# sourceMappingURL=bundle.js.map
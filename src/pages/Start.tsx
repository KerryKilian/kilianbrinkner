
export default function Start() {
    return (
      <div className="page">
        <h1 className="h1">Kilian Aaron Brinkner</h1>
        <h2 className="h2">Über mich</h2>
        <div className="about__row">
          <p className="p about__rowchild">Ich bin 22 Jahre alt und lebe in Berlin. Ich habe bereits einen Bachelor in Geoinformation mit dem Schwerpunkt Geoinformatik. Während des Studiums habe ich gemerkt, dass
          mir die Programmierung viel Spaß macht. Deswegen habe ich während des Studiums angefangen, mir weitere Konzepte und neue Programmiersprachen beizubringen. Mein Fokus lag schon immer auf 
          der App- und Webentwicklung. <br /> Ab Winter 2022 habe ich Module aus dem Bachelor Medieninformatik belegt, damit ich nun ab Winter 2023 meinen Master in Medieninformatik beginnen kann.
          In diesem einem Jahr konnte ich viel dazulernen. Ich habe Module aus dem Bereich Web-, Software- und Appentwicklung belegt und fühle mich nun viel sicherer im Umgang mit der Programmierung. Nun starte
          ich meinen Master in Medieninformatik und hoffe, noch mehr in der Softwareentwicklung zu lernen.</p>
          <div className="about__rowchild">
            <img className="rounded " src={window.location.origin + "/" + "kilianbrinkner/images/Kilian/Kilian1.jpg"} alt="Image of Kilian Aaron Brinkner"></img>
          </div>
        </div>
      </div>
      
    );
  }
  
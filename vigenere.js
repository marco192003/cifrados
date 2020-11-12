function PhraseToArray(Frase)
  {
   var Out = [];
   for(var i = 0; i < Frase.length; i++)
   {
    var CodeNumber = Frase.charCodeAt(i);
    if(CodeNumber >= 97 && CodeNumber <= 122)
    {
     CodeNumber = CodeNumber - 32;
    }
    if(CodeNumber == 209 || CodeNumber == 241)
    {
     Out.push(15);
    }
    if(CodeNumber == 32)
    {
     Out.push(32);
    }
    else{
     if(CodeNumber-64 < 15)
     {
      Out.push(CodeNumber-64);
     }
     else if(CodeNumber-64 >= 15 && CodeNumber-64 < 28){
      Out.push(CodeNumber-63);
     }
    }
   }
   return Out;
  }
  function Encriptar(ModeEnc)
  {
   var GetPhrase = document.getElementById('InputText').value;
   var GetPass = document.getElementById('PassWord').value;
   var Codes = [];
   if(GetPhrase.length < 1 || GetPass.length < 1)
   {
    alert('La frase/contraseña no puede estar en blanco')
    return;
   }
   var PassData = PhraseToArray(GetPass);
   var PhraseData = PhraseToArray(GetPhrase);
   var SpaceCount = 0;
   if (ModeEnc == true)
   {
    for(var i = 0; i < PhraseData.length; i++)
    {
     if(PhraseData[i] == 32)
     {
      Codes.push(32);
      SpaceCount += 1;
     }else{
      Codes.push((PassData[(i - SpaceCount) % PassData.length] + PhraseData[i]) % 27);
     }
    }
   }else{
    for(var i = 0; i < PhraseData.length; i++)
    {
     if(PhraseData[i] == 32)
     {
      Codes.push(32);
      SpaceCount += 1;
     }else{
      var Value = PhraseData[i] - PassData[(i - SpaceCount) % PassData.length];
      if (Value < 1)
      {
       Value += 27;
      }
     Codes.push(Value % 27);
     }
    }
   }
   return Codes;
  }
<!-- Devolver el resultado -->
  function RebuildString(Codigos)
  {
   var Salida = ""
   for(var i = 0; i < Codigos.length; i++)
   {
    if (Codigos[i] == 15 )
    {
     Salida += String.fromCharCode(209);
    }
    if (Codigos[i] == 32)
    {
     Salida += String.fromCharCode(32);
    }
    if (Codigos[i] == 0)
    {
     Salida += String.fromCharCode(90);
    }
    if(Codigos[i] < 15 && Codigos [i] > 0)
     Salida += String.fromCharCode(Codigos[i]+64);
    else if(Codigos[i] > 15 && Codigos[i] < 28){
     Salida += String.fromCharCode(Codigos[i]+63);
    }
   }
   document.getElementById('Result').value = Salida;
  }
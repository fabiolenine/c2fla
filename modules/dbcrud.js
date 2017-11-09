/*jshint esversion: 6 */

module.exports = function(mongoose)
{
  const receiveSchema       = require('./modelc2fla');

  let savereceive = function(data, callback) {
      // let newdata = new receiveSchema.model(data);
      // newdata.save(function(err,result){
      //   if(!err) callback(null, result);
      //   else callback(err, null);
      // });
  };

  let savesend = function(data, callback) {
      // let newdata = new sendSchema.model(data);
      // newdata.save(function(err,result){
      //   if(!err) callback(null, result);
      //   else callback(err, null);
      // });
  };

  let savecontext = function(data, context, resultlang, callback){
    // let newdata = new watsoncontextSchema.model({ "input": { "text": context.input.text},
    //                                               "context": {"conversation_id": context.context.conversation_id,
    //                                                           "system": context.context.system,
    //                                                           "defaultCounter": context.context.defaultCounter,
    //                                                           "fbid": data.fbid,
    //                                                           "date": data.date,
    //                                                           "first_name": data.first_name,
    //                                                           "last_name": data.last_name,
    //                                                           "profile_pic": data.profile_pic,
    //                                                           "locale": data.locale,
    //                                                           "timezone": data.timezone,
    //                                                           "gender": data.gender,
    //                                                           "idioma": resultlang,
    //                                                           "flow": context.context.flow,
    //                                                           "nomefeedback": context.context.nomefeedback,
    //                                                           "tipofeedback": context.context.tipofeedback,
    //                                                           "textofeedback": context.context.textofeedback,
    //                                                           "oferecer": context.context.oferecer,
    //                                                           "precisa": context.context.precisa,
    //                                                           "telefone": context.context.telefone,
    //                                                           "emailsorteio": context.context.emailsorteio,
    //                                                           "empresa": context.context.empresa,
    //
    //                                                           // Registrar o uso do cardboard em outro schema - Backlog
    //                                                           // "cardboard": context.context.cardboard,
    //                                                           "festaweek": context.context.festaweek,
    //                                                           "localatracao": context.context.localatracao,
    //                                                           "artistas": context.context.artistas,
    //                                                           "inteirameiaentrada": context.context.inteirameiaentrada,
    //                                                           "genero": context.context.genero,
    //                                                           "ingressos": context.context.ingressos,
    //                                                           "loungesingressos": context.context.loungesingressos,
    //                                                           "arenasRC": context.context.arenasRC,
    //                                                           "hoteis": context.context.hoteis,
    //                                                           "quarto": context.context.quarto
    //
    //                                                           },
    //                                               "entities": context.entities,
    //                                               "intents": context.intents,
    //                                               "output": { "text": context.output.text,
    //                                                           "nodes_visited": context.output.nodes_visited
    //                                                         }
    //                                             });
    // newdata.save(function(err,result){
    //   if(!err) callback(null, result);
    //   else callback(err, null);
    // });
  };

  let loadlastcontext = function(data, lang, callback){
    // let query;
    //
    // if(!lang) query = {"context.fbid": data.fbid};
    // else query = {"context.fbid": data.fbid, "context.idioma": lang};
    //
    // watsoncontextSchema.model.find(query,{"_id":0, context:1}).sort({"context.date":-1}).limit(1).exec(function(err,result){
    //   if(!err) callback(null, result);
    //   else callback(err, null);
    // });
  };

  let findcardboard = function(namecardboard, callback){
    // let query = {"name": namecardboard};
    //
    // cardboardSchema.model.find(query).exec(function(err,result){
    //   if(!err) callback(null, result[0]);
    //   else callback(err, null);
    // });
  };

  let regress = {"savereceive"    : savereceive,
                 "savesend"       : savesend,
                 "savecontext"    : savecontext,
                 "loadlastcontext": loadlastcontext,
                 "findcardboard"  : findcardboard
               };

  return regress;
};

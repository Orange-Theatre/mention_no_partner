odoo.define('mention_no_partner.composer', function (require) {
"use strict";
	var BasicComposer = require('mail.composer').BasicComposer;

	var config = require('web.config');
	var core = require('web.core');
	var web_utils = require('web.utils');

	var _t = core._t;
	var QWeb = core.qweb;

	BasicComposer.include({

		init: function (parent, options) {
			var result = this._super(parent, options);
			this.register_new_fetch_partners();
			return result;
		},

		register_new_fetch_partners: function() {		
			var dict = this.mention_manager.listeners;
			for(var i in dict){
    			if(dict[i].model == "res.partner"){
    				// Register new fetch_callback
    				dict[i].fetch_callback = this.mention_fetch_partners_filtered.bind(this);
    				console.log(this.mention_manager.listeners);
			        break;
			    } else {
			    	return;
			    }
			}
		},

		mention_fetch_partners_filtered: function (search) {
			self = this;
			var fetch_partners = this.mention_fetch_partners.bind(this);
			return $.when(fetch_partners(search)).then(function(suggestions){
				console.log(suggestions);
				// Filter suggestions
				return suggestions;
			});
		},
	});
});
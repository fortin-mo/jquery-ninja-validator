/*
*   Version 2.6.3
*   2015-12-16
*   Created by Marc-Olivier Fortin
*   
*   Tested with bootstrap 3.3 or higher             http://getbootstrap.com/
*   Tested with DataTables 1.10.9 or higher         http://datatables.net/
*   Tested with JQuery.Loading 1.1.0                http://github.com/CarlosBonetti/jquery-loading
*   Tested with Moment 2.10.6                       http://momentjs.com/
*   Tested with Boostrap.Datetimepicker 4.17.37     https://eonasdan.github.io/bootstrap-datetimepicker/
*
*   Thanks to Ariya Hidayat for                     http://esprima.org/demo/validate.html
*/

(function ($) {

    /**************************************************************************************************************************************************************************
    *                                                                                   PRIVATE METHODS
    *****************************************************************************************************************************************************************************/

    //makes sure placement attribute is correct
    function _fnTryParsePlacement(value, defaultValue) {
        if (!defaultValue) defaultValue = undefined
        var retValue = defaultValue;
        if (value === undefined) return retValue;
        if (typeof value === 'string') {
            lowerCaseValue = value.toLowerCase();
            switch (lowerCaseValue) {
                case 'right':
                case 'left':
                case 'top':
                case 'bottom':
                    retValue = lowerCaseValue;
                    break;
            }
        }
        else if (typeof value === 'number') {
            switch (value) {
                case 1:
                    retValue = 'right';
                    break;
                case 2:
                    retValue = 'left';
                    break;
                case 3:
                    retValue = 'top';
                    break;
                case 4:
                    retValue = 'bottom';
                    break;
            }
        }

        return retValue;
    }
    //boolean.TryParse equivalent
    function _fnTryParseBoolean(value, defaultValue) {
        var retValue = defaultValue ? defaultValue : undefined;
        if (value === undefined) return retValue;
        if (typeof value === 'string') {
            if (value.toLowerCase() === 'true') {
                retValue = true;
            }
            else if (value.toLowerCase() === 'false') {
                retValue = false;
            }
        }
        else if (typeof value === 'boolean') {
            retValue = value;
        }

        return retValue;
    }
    //int.TryParse equivalent
    function _fnTryParseInt(value, defaultValue) {
        var retValue = defaultValue ? defaultValue : undefined;
        if (value !== undefined) {
            retValue = parseInt(value);
        }
        return retValue;
    }
    //initiate the input
    function _fnInitInput(oInput, oValidator) {

        //Adding JQuery Datepicker functionnality to inputs
        _fnToDatepicker(oInput, oValidator);

        //Adding Bootstrap DateTimePicker functionnality to inputs
        _fnToDatetimepicker(oInput, oValidator);

        //Adding placeholder required text to inputs
        _fnRequiredPlaceHolder(oInput, oValidator);

        //Adding autocomplete functionnality to inputs
        _fnToAutoComplete(oInput, oValidator);

        //Adding input validation to inputs
        _fnInitInputValidation(oInput, oValidator);

    }
    /****************************************************************
    retrive validation attributes from data attributes and add them
    to the input as an object accessed though input.ninja_validation.[validation]
    ****************************************************************/
    function _fnLoadValidationFromAttr(oInput) {
        if (oInput.ninja_validation) return; // no need to reload the information
        var validations = {
            val_checkbox: oInput.is(':checkbox') ? "" : undefined,
            val_radio_button: oInput.is(':radio') ? "" : undefined,
            val_select: oInput.is('select') ? "" : undefined,
            val_required : oInput.attr('data-val-required'),
            val_postal_code: oInput.attr('data-val-postalcode'),
            val_phone_number: oInput.attr('data-val-phonenumber'),
            val_email: oInput.attr('data-val-email'),
            val_password: oInput.attr('data-val-password'),
            val_equal_to: oInput.attr('data-val-equalto'),
            val_confirmed_password: oInput.attr('data-val-confirmedpassword'),
            val_positive_int: oInput.attr('data-val-positiveint'),
            val_negative_int: oInput.attr('data-val-negativeint'),
            val_positive_number: oInput.attr('data-val-positivenumber'),
            val_negative_number: oInput.attr('data-val-negativenumber'),
            val_year: oInput.attr('data-val-year'),
            val_date: oInput.attr('data-val-date'),
            val_date_iso: oInput.attr('data-val-dateiso'),
            val_personnal_name: oInput.attr('data-val-personnalname'),
            val_fullname: oInput.attr('data-val-fullname'),
            val_username: oInput.attr('data-val-username'),
            val_custom_validation: oInput.attr('data-val-customvalidation'),
            val_max_int_value: oInput.attr('data-val-maxintvalue'),
            val_min_int_value: oInput.attr('data-val-minintvalue'),
            val_min_number_value: oInput.attr('data-val-minnumbervalue'),
            val_max_number_value: oInput.attr('data-val-maxnumbervalue'),
            val_max_string_length: oInput.attr('data-val-maxstringlength'),
            val_min_string_length: oInput.attr('data-val-minstringlength'),
            val_number: oInput.attr('data-val-number'),
            val_credit_card: oInput.attr('data-val-creditcard')
        };
        var messages = {
            val_required : oInput.attr('data-val-required-msg'),
            val_postal_code : oInput.attr('data-val-postalcode-msg'),
            val_phone_number : oInput.attr('data-val-phonenumber-msg'),
            val_email : oInput.attr('data-val-email-msg'),
            val_password : oInput.attr('data-val-password-msg'),
            val_equal_to : oInput.attr('data-val-equalto-msg'),
            val_confirmed_password : oInput.attr('data-val-confirmedpassword-msg'),
            val_positive_int : oInput.attr('data-val-positiveint-msg'),
            val_negative_int : oInput.attr('data-val-negativeint-msg'),
            val_positive_number : oInput.attr('data-val-positivenumber-msg'),
            val_negative_number : oInput.attr('data-val-negativenumber-msg'),
            val_year : oInput.attr('data-val-year-msg'),
            val_date : oInput.attr('data-val-date-msg'),
            val_date_iso : oInput.attr('data-val-dateiso-msg'),
            val_personnal_name : oInput.attr('data-val-personnalname-msg'),
            val_fullname : oInput.attr('data-val-fullname-msg'),
            val_username : oInput.attr('data-val-username-msg'),
            val_custom_validation : oInput.attr('data-val-customvalidation-msg'),
            val_max_int_value : oInput.attr('data-val-maxintvalue-msg'),
            val_min_int_value : oInput.attr('data-val-minintvalue-msg'),
            val_min_number_value : oInput.attr('data-val-minnumbervalue-msg'),
            val_max_number_value : oInput.attr('data-val-maxnumbervalue-msg'),
            val_max_string_length : oInput.attr('data-val-maxstringlength-msg'),
            val_min_string_length : oInput.attr('data-val-minstringlength-msg'),
            val_number : oInput.attr('data-val-number-msg'),
            val_credit_card : oInput.attr('data-val-creditcard-msg')
        }
        oInput.ninja_validation = $.extend(oInput.ninja_validation, validations);
        oInput.ninja_validation_messages = $.extend(oInput.ninja_validation_messages, messages);
    }

    /****************************************************************
    retrive ajax options from data attributes and returns
    them in a object options
    ****************************************************************/
    function _fnLoadAjaxOptionsFromAttr(oInput) {
        var options = {
            initiate_validation: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-initiatevalidation')),
            form_container: oInput.attr('data-ninja-ajax-formcontainer'),
            controller: oInput.attr('data-ninja-ajax-controller'),
            action: oInput.attr('data-ninja-ajax-action'),
            use_url_parameter: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-useurlparameter')),
            prevent_default: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-preventdefault')),
            validate_first: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-validatefirst')),
            type: oInput.attr('data-ninja-ajax-type'),
            cache: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-cache')),
            processData: _fnTryParseBoolean(oInput.attr('data-ninja-ajax-processdata')),
            contentType: oInput.attr('data-ninja-ajax-contentType'),
            datatype: oInput.attr('data-ninja-ajax-datatype'),
            url: oInput.attr('data-ninja-ajax-url'),
            success_container: oInput.attr('data-ninja-ajax-successcontainer'),
            error_container: oInput.attr('data-ninja-ajax-errorcontainer'),
            trigger: oInput.attr('data-ninja-ajax-trigger')
        };
        return options;
    }
    /****************************************************************
    retrive settings options from data attributes and returns
    them in a object options
    ****************************************************************/
    function _fnLoadSettingsFromAttr(oInput) {
        var options = {
            enable_field_validation: _fnTryParseBoolean(oInput.attr('data-ninja-settings-enablefieldvalidation')),
            on_document_ready: _fnTryParseBoolean(oInput.attr('data-ninja-settings-ondocumentready')),
            invalid_class: oInput.attr('data-ninja-settings-invalidclass'),
            valid_class: oInput.attr('data-ninja-settings-validclass'),
            on_submit: _fnTryParseBoolean(oInput.attr('data-ninja-settings-onsubmit')),
            popover: _fnTryParseBoolean(oInput.attr('data-ninja-settings-popover')),
            popover_placement: oInput.attr('data-ninja-settings-popoverplacement'),
            popover_on_select: _fnTryParseBoolean(oInput.attr('data-ninja-settings-popoveronselect')),
            popover_on_radio: _fnTryParseBoolean(oInput.attr('data-ninja-settings-popoveronradio')),
            popover_on_checkbox: _fnTryParseBoolean(oInput.attr('data-ninja-settings-popoveroncheckbox')),
            loading: _fnTryParseBoolean(oInput.attr('data-ninja-settings-loading')),
            required_label: _fnTryParseBoolean(oInput.attr('data-ninja-settings-requiredlabel')),
            popover_trigger: oInput.attr('data-ninja-settings-popovertrigger'),
            required_label_content: oInput.attr('data-ninja-settings-requiredlabelcontent'),
            autocomplete_message_template: oInput.attr('data-ninja-settings-autocompletemessagetemplate'),
            ignore: oInput.attr('data-ninja-settings-ignore'),
            autocomplete_min: oInput.attr('data-ninja-settings-autocompletemin'),
            enable_autocomplete: _fnTryParseBoolean(oInput.attr('data-ninja-settings-enableautocomplete'))
        };
        return options;
    }
    /****************************************************************
    retrive messages options from data attributes and returns
    them in a object options
    ****************************************************************/
    function _fnLoadMessagesFromAttr(oInput) {
        var options = {
            required: oInput.attr('data-ninja-messages-required'),
            postal_code: oInput.attr('data-ninja-messages-postalcode'),
            phone_number: oInput.attr('data-ninja-messages-phonenumber'),
            email: oInput.attr('data-ninja-messages-email'),
            password: oInput.attr('data-ninja-messages-password'),
            equal_to: oInput.attr('data-ninja-messages-equalto'),
            positive_int: oInput.attr('data-ninja-messages-positiveint'),
            negative_int: oInput.attr('data-ninja-messages-negativeint'),
            positive_number: oInput.attr('data-ninja-messages-psitivenumber'),
            negative_number: oInput.attr('data-ninja-messages-negativenumber'),
            year: oInput.attr('data-ninja-messages-year'),
            date: oInput.attr('data-ninja-messages-date'),
            date_iso: oInput.attr('data-ninja-messages-dateiso'),
            personnal_name: oInput.attr('data-ninja-messages-personnalname'),
            fullname: oInput.attr('data-ninja-messages-fullname'),
            username: oInput.attr('data-ninja-messages-username'),
            custom_validation: oInput.attr('data-ninja-messages-customvalidation'),
            int_max_value: oInput.attr('data-ninja-messages-intmaxvalue'),
            int_min_value: oInput.attr('data-ninja-messages-intminvalue'),
            number_max_value: oInput.attr('data-ninja-messages-numbermaxvalue'),
            number_min_value: oInput.attr('data-ninja-messages-numberminvalue'),
            string_max_length: oInput.attr('data-ninja-messages-stringmaxlength'),
            string_min_length: oInput.attr('data-ninja-messages-stringminlength'),
            number: oInput.attr('data-ninja-messages-number'),
            creditcard: oInput.attr('data-ninja-messages-creditcard'),
            range_length: oInput.attr('data-ninja-messages-rangelength'),
            range: oInput.attr('data-ninja-messages-range'),
            max: oInput.attr('data-ninja-messages-max'),
            min: oInput.attr('data-ninja-messages-min'),
            url: oInput.attr('data-ninja-messages-url'),
            digits: oInput.attr('data-ninja-messages-digits'),
            invalid: oInput.attr('data-ninja-messages-invalid'),
            autocomplete_error: oInput.attr('data-ninja-messages-autocompleteerror'),
            autocomplete_loading: oInput.attr('data-ninja-messages-autocompleteloading'),
            ajax_loading: oInput.attr('data-ninja-messages-ajaxloading'),
            ajax_thrown_error: oInput.attr('data-ninja-messages-ajaxthrownerror')
        };
        return options;
    }
    //Adding JQuery Datepicker functionnality to inputs
    function _fnToDatepicker(oInput, oValidator) {
        if ($.ninjaValidator.isTrue(oInput.attr('data-ninja-use-datepicker')) && $.isFunction($.fn.datetimepicker)) {

            var options = _fnLoadDatepickerOptions(oInput, oValidator);
            var regional = oInput.attr('data-ninja-datepicker-regional');
            var minDateTo = oInput.attr('data-ninja-datepicker-mindateto');
            var maxDateTo = oInput.attr('data-ninja-datepicker-maxdateto');

            if (minDateTo !== undefined || maxDateTo !== undefined) {
                options.onClose = function (selectedDate) {
                    var $to = $('#' + minDateTo);
                    if ($to !== undefined && $to.length > 0) {
                        $to.datepicker("option", "minDate", selectedDate);
                    }
                    $to = $('#' + maxDateTo);
                    if ($to !== undefined && $to.length > 0) {
                        $to.datepicker("option", "maxDate", selectedDate);
                    }
                }
            }
            oInput.datepicker(options);
        }
    }
    //Load jquery datepicker options from input's attributes
    function _fnLoadDatepickerOptions(oInput, oValidator) {
        var dateFormat = oInput.attr('data-ninja-datepicker-dateformat');
        var showButtonPanel = oInput.attr('data-ninja-datepicker-showbuttonpanel');
        var changeMonth = oInput.attr('data-ninja-datepicker-changemonth');
        var changeYear = oInput.attr('data-ninja-datepicker-changeyear');
        var showOtherMonths = oInput.attr('data-ninja-datepicker-showothermonths');
        var selectOtherMonths = oInput.attr('data-ninja-datepicker-selectothermonths');
        var numberOfMonths = oInput.attr('data-ninja-datepicker-numberofmonths');
        var showOn = oInput.attr('data-ninja-datepicker-showon');
        var buttonImage = oInput.attr('data-ninja-datepicker-buttomimage');
        var buttonImageOnly = oInput.attr('data-ninja-datepicker-buttonimageonly');
        var buttonText = oInput.attr('data-ninja-datepicker-buttontext');
        var showWeek = oInput.attr('data-ninja-datepicker-showweek');
        var firstDay = oInput.attr('data-ninja-datepicker-firstday');
        var minDate = oInput.attr('data-ninja-datepicker-mindate');
        var maxDate = oInput.attr('data-ninja-datepicker-maxdate');

        var options = {
            dateFormat: dateFormat !== undefined ? dateFormat : oValidator.settings.datepicker_format,
            showButtonPanel: _fnTryParseBoolean(showButtonPanel),
            changeMonth: _fnTryParseBoolean(changeMonth),
            changeYear: _fnTryParseBoolean(changeYear),
            showOtherMonths: _fnTryParseBoolean(showOtherMonths),
            selectOtherMonths: _fnTryParseBoolean(selectOtherMonths),
            showOn: showOn,
            buttonImage: buttonImage,
            buttonImageOnly: _fnTryParseBoolean(buttonImageOnly),
            buttonText: buttonText,
            showWeek: _fnTryParseBoolean(showWeek),
            firstDay: _fnTryParseInt(firstDay),
            numberOfMonths: _fnTryParseInt(numberOfMonths),
            minDate: minDate,
            maxDate: maxDate
        }

        return options;
    }
    //Adding Bootstrap DateTimePicker functionnality to input
    function _fnToDatetimepicker(oInput, oValidator) {
        if ($.ninjaValidator.isTrue(oInput.attr('data-ninja-use-datetimepicker')) && $.isFunction($.fn.datetimepicker)) {
            var options = _fnLoadDatetimepickerOptions(oInput, oValidator);

            var prev = oInput.prev();
            var IdDatePicker = "datepicker_" + oInput.attr('id');
            if (prev !== undefined && prev.length > 0) {
                var $elem = $('<div id="' + IdDatePicker + '" class="input-group date"><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>').insertAfter($(prev));
                $elem.prepend(oInput);
            }
            else {
                prev = oInput.parent();
                var $elem = $('<div id="' + IdDatePicker + '" class="input-group date"><span class="input-group-addon"><span class="glyphicon glyphicon-calendar"></span></span></div>').prependTo($(prev));
                $elem.prepend(oInput);
            }
            $elem.datetimepicker(options);
            if (oInput.attr('data-placement') === undefined) {
                oInput.attr('data-placement', 'top');
            }
            $elem.on("dp.hide", function () {
                var datepicker = $(this).data("DateTimePicker");
                var $inputControl = datepicker.inputControl;
                if ($inputControl === undefined || $inputControl.length <= 0) $inputControl = $(this).find('input');
                if ($.ninjaValidator.isTrue(datepicker.hasChange)) $inputControl.trigger('change');
                datepicker.hasChange = false;
            });
            $elem.on("dp.change", function () {
                var datepicker = $(this).data("DateTimePicker");
                datepicker.hasChange = true;
            });

            var minDateTo = oInput.attr('data-ninja-datetimepicker-mindateto');
            var maxDateTo = oInput.attr('data-ninja-datetimepicker-maxdateto');

            if (minDateTo !== undefined || maxDateTo !== undefined) {
                $elem.on("dp.change", function (e) {
                    var $to = $('#datepicker_' + minDateTo);
                    if ($to.length > 0 && $to.data("DateTimePicker") !== undefined) {
                        $to.data("DateTimePicker").minDate(e.date);
                    }
                    $to = $('#datepicker_' + maxDateTo);
                    if ($to.length > 0 && $to.data("DateTimePicker") !== undefined) {
                        $to.data("DateTimePicker").maxDate(e.date);
                    }
                })
            }
        }
    }
    //Load bootstrap datetimepicker options from input's attribute
    function _fnLoadDatetimepickerOptions(oInput, oValidator) {
        var useCurrent = oInput.attr('data-ninja-datetimepicker-usecurrent');
        var format = oInput.attr('data-ninja-datetimepicker-format');
        var showClear = oInput.attr('data-ninja-datetimepicker-showclear');
        var showClose = oInput.attr('data-ninja-datetimepicker-showclose');
        var showTodayButton = oInput.attr('data-ninja-datetimepicker-showtodaybutton');
        var allowInputToggle = oInput.attr('data-ninja-datetimepicker-allowinputtoggle');
        var defaultDate = oInput.attr('data-ninja-datetimepicker-defaultdate');
        var locale = oInput.attr('data-ninja-datetimepicker-locale');
        var minDate = oInput.attr('data-ninja-datetimepicker-mindate');
        var maxDate = oInput.attr('data-ninja-datetimepicker-maxdate');
        var keepInvalid = oInput.attr('data-ninja-datetimepicker-keepinvalid');
        var stepping = oInput.attr('data-ninja-datetimepicker-stepping');
        var collapse = oInput.attr('data-ninja-datetimepicker-collapse');

        var options = {
            collapse: _fnTryParseBoolean(collapse),
            stepping: _fnTryParseInt(stepping),
            useCurrent: _fnTryParseBoolean(useCurrent),
            format: format !== undefined ? format : oValidator.settings.datetimepicker_format,
            showTodayButton: _fnTryParseBoolean(showTodayButton),
            showClear: _fnTryParseBoolean(showClear),
            showClose: _fnTryParseBoolean(showClose),
            allowInputToggle: _fnTryParseBoolean(allowInputToggle),
            defaultDate: defaultDate !== undefined ? $.ninjaValidator.isTrue(defaultDate) ? true : $.ninjaValidator.isFalse(defaultDate) ? false : defaultDate : oValidator.settings.datetimepicker_default_date,
            locale: locale !== locale ? locale : oValidator.settings.locale,
            minDate: minDate ? minDate : false,
            maxDate: maxDate ? maxDate : false,
            keepInvalid: _fnTryParseBoolean(keepInvalid)
        };

        if (options.locale.indexOf('fr') === 0) {
            options.tooltips = {
                today: "Aujourd'hui",
                clear: 'Effacer',
                close: 'Fermer',
                selectMonth: 'Mois',
                prevMonth: 'Mois precedent',
                nextMonth: 'Mois suivant',
                selectYear: 'Annee',
                prevYear: 'Annee precedente',
                nextYear: 'Annee suivante',
                selectDecade: 'Decenie',
                prevDecade: 'Decenie precedente',
                nextDecade: 'Decenie suivante',
                prevCentury: 'Centenaire precedent',
                nextCentury: 'Centenaire suivant',
                pickHour: 'Heure',
                incrementHour: "Augmenter l'heure",
                decrementHour: "Diminuer l'heure",
                pickMinute: 'Minute',
                incrementMinute: 'Augmenter les minutes',
                decrementMinute: 'Diminuer les minutes',
                pickSecond: 'Seconde',
                incrementSecond: 'Augmenter les secondes',
                decrementSecond: 'Diminer les secondes',
                togglePeriod: 'Periode',
                selectTime: 'Temps'
            };
        }

        return options;
    }

    //Adding autocomplete functionnality to inputs
    function _fnToAutoComplete(oInput, oValidator) {
        if ($.ninjaValidator.isTrue(oValidator.settings.enable_autocomplete) && $.ninjaValidator.isTrue(oInput.attr('data-ninja-autocomplete'))) { //if autocomplete is enable and if the input is an autocomplete field

            if (oInput.parent().hasClass('input-group')) {
                oInput.parent().after($.ninjaValidator.format(oValidator.settings.autocomplete_message_template, oInput.attr('id'), oValidator.settings.messages.autocomplete_loading, oValidator.settings.messages.autocomplete_error)); //we add the necessary span to show error

                if ($.ninjaValidator.isTrue(oValidator.settings.enable_autocomplete_info) && $.isFunction($.fn.popover)) {
                    var $elem = $($.ninjaValidator.format(oValidator.settings.autocomplete_info_template, "info_" + oInput.attr('id')));
                    $elem.attr('data-content', oValidator.settings.messages.autoCompleteFieldInfo);
                    $elem.attr('title', 'Info');
                    $elem.popover({ trigger: 'hover' });
                    oInput.parent().append($elem);
                }
            }
            else {
                oInput.after($.ninjaValidator.format(oValidator.settings.autocomplete_message_template, oInput.attr('id'), oValidator.settings.messages.autocomplete_loading, oValidator.settings.messages.autocomplete_error)); //we add the necessary span to show error

                if ($.ninjaValidator.isTrue(oValidator.settings.enable_autocomplete_info) && $.isFunction($.fn.popover)) {

                    var $inputGroup = $('<div class="input-group"></div>');
                    oInput.before($inputGroup);

                    var $addon = $($.ninjaValidator.format(oValidator.settings.autocomplete_info_template, "info_" + oInput.attr('id')));
                    $addon.attr('data-content', oValidator.settings.messages.autoCompleteFieldInfo);
                    $addon.attr('title', 'Info');
                    $addon.popover({ trigger: 'hover' });
                    $inputGroup.append(oInput);
                    $inputGroup.append($addon);
                }

            }
            oInput.keyup(function (e) {
                e.preventDefault();
                oValidator.autoComplete($(this));
            });

        }
    }
    //Adding placeholder required text to inputs
    function _fnRequiredPlaceHolder(oInput, oValidator) {
        var requiredFor = $(oValidator.currentForm).find('[data-val-for="' + oInput.attr('id') + '"]');
        if ($.ninjaValidator.isTrue(oValidator.settings.enable_field_validation) && $.ninjaValidator.isTrue(oValidator.settings.required_placeholder) && (oInput.attr('data-val-required') !== undefined || (requiredFor !== undefined && $(requiredFor).attr('data-val-required') !== undefined))) {//settings.required_placeholder :true to enable required text int input placehover
            var placeholder = oInput.attr('placeholder');
            if (!placeholder) {
                placeholder = "";
            }
            oInput.attr('placeholder', placeholder + oValidator.settings.required_placeholder_content);
        }
    }
    //Adding input validation to inputs
    function _fnInitInputValidation(oInput, oValidator) {
        if ($.ninjaValidator.isTrue(oInput.attr('data-validation')) && $.ninjaValidator.isTrue(oValidator.settings.enable_field_validation)) {

            _fnLoadValidationFromAttr(oInput);

            if ($.ninjaValidator.isTrue(oValidator.settings.popover) && $.isFunction($.fn.popover)) { //if popover is true and popover function exist. requires bootstrap.js or other popover plugin

                if (oInput.is(':checkbox')) {
                    if ($.ninjaValidator.isTrue(oValidator.settings.popover_on_checkbox)) { //we can disable popover on checkbox
                        oValidator.activatePopover(oInput);
                    }
                }
                else if (oInput.is(':radio')) {
                    if ($.ninjaValidator.isTrue(oValidator.settings.popover_on_radio)) {//we can disable popover on radio
                        oValidator.activatePopover($input);
                    }
                }
                else if (oInput.is('select')) {
                    if ($.ninjaValidator.isTrue(oValidator.settings.popover_on_select)) {//we can disable popover on select
                        oValidator.activatePopover(oInput);
                    }
                }
                else {
                    oValidator.activatePopover(oInput);
                }

            }
            else if ($.ninjaValidator.isTrue(oValidator.settings.val_msg_label)) {
                oValidator.addValMessageLabel(oInput);
            }

            oInput.change(function () {
                oValidator.addValidClass(oValidator.validateField($(this)), $(this));
            });
        }
    }




    /************************************************************************************************************************************************************************************
    *                                                                                           CONSTRUCTOR
    *************************************************************************************************************************************************************************************/
    $.ninjaValidator = function (oCaller, oForm, oSettings, oMessages, oAjax) {
        this.settings = $.extend(true, {}, $.ninjaValidator.defaults, oSettings);
        this.settings.messages = $.extend(true, {}, $.ninjaValidator.messages, oMessages);
        this.ajax = $.extend(true, {}, $.ninjaValidator.ajax, oAjax);
        this.currentForm = oForm;
        this.oCaller = oCaller;
        if (this.submitForm !== undefined && oCaller !== undefined) {
            oCaller.data('ninjaValidator', this);
            $.ninjaValidator.Validators.push(this);
        }
    };
    //===================================================================================================================================================================================

    $.ninjaValidator.Validators = [];

    $.ninjaValidator.Validator = function (index) {
        if ($.ninjaValidator.Validators === undefined) return [];
        if (index === undefined) return $.ninjaValidator.Validators;
        else if (typeof (index) === "number") {
            index = parseInt(index);
            if (index < 0) return null;
            if (index >= $.ninjaValidator.Validators.length) return null;

            return $.ninjaValidator.Validators[index];
        }
        else if (typeof (index) === "string") {
            for (var i = 0; i < $.ninjaValidator.Validators.length; i++) {
                var current = $.ninjaValidator.Validators[i];
                if (current !== undefined && current.currentForm !== undefined && (current.currentForm.attr('id') == index || current.currentForm.attr('name') == index)) {
                    return current;
                }
            }
        }
    };

    /*********************
    code from jquery.validate
    *********************/
    $.ninjaValidator.format = function (source, params) {
        if (arguments.length === 1) {
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.ninjaValidator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function () {
                return n;
            });
        });
        return source;
    };
    //extending our validator with numerous functions and defaults settings
    $.extend($.ninjaValidator, {

        oCaller: null,
        /************************************************************************************************************************************************************************************
        *                                                                                           DEFAULTS AJAX SETTINGS
        *************************************************************************************************************************************************************************************/
        ajax: {
            loading_template: '<span><img class="loading-img" src="/Images/loading.ico" /> {0}</span>', //
            submit_action_value: "", //
            initiate_validation: true, // initier la validation, function _Init
            trigger: 'click', // le trigger de l'évévenement, utiliser pour ajax call button
            use_url_parameter: false, // pas encore implementer
            form_container: "", // id du conteneur que l'on veut spécifier comme étant le form, utiliser pour les nested form ajax
            prevent_default: true, // prévenir l'évenement par defaut suivant le submit
            validate_first: true, // valider avant de le submit
            type: "POST", // option ajax
            cache: false, // option ajax
            processData: false, // option ajax
            contentType: false, // option ajax
            datatype: "", // option ajax
            action: "", // action à appeler dans le controleur
            controller: "", // nom du controleur à appeler
            url: "", // addresse de l'action a appeler, ex, /Evenement/Ajouter
            data: "", // si l'on veut envoyer du data spécifique, sinon on va chercher les inputs du form
            success_container: "", // id du conteneur qui va recevoir le data recu en cas de success
            error_container: "", // id du conteneur qui va recevoir le data recu en cas d'erreur, s'il n'est pas spécifier, on utilise le même que le success
            success: function (data, container) { // fonction par default lors d'un success ajax
                $('#' + container).html("");
                $('#' + container).html(data);
            },
            error: function (jqXHR, textStatus, errorThrown, container, message) { // fonction par default lors d'un erreur ajax
                $('#' + container).html($.ninjaValidator.format(message, errorThrown));
            },
            datatables: [] // tableau incluant les DataTables inclue dans le form
        },
        /************************************************************************************************************************************************************************************
        *                                                                                           DEFAULTS SETTINGS
        *************************************************************************************************************************************************************************************/
        defaults: {
            datepicker_format: 'yy-mm-dd', // format par defaut des JQuery Datepicker
            datetimepicker_default_date: 'now', // date par defaut pour JQuery Bootstrap Datetimepicker = date d'aujourd'hui
            datetimepicker_format: 'YYYY-MM-DD HH:mm:ss', // format par defaut des JQuery Bootstrap Datetimepicker
            locale: 'en-ca', // Région par defaut des JQuery Bootstrap Datetimepicker, nécéssaire pour Moment.js / moment-with-licales.js
            enable_field_validation: true, // définit si l'on veut que les inputs soit validé
            autocomplete_info_template: '<span class="input-group-addon" id="{0}">?</span>', // template pour afficher les autocompletes
            enable_autocomplete_info: true, // ajouter un tooltip d'information sur les champs autocompletes
            debug: false, // mode debug
            number_with_comma: false, // nombre avec comma valid, ex : 1,3 vs 1.3
            on_document_ready: true, // document.ready
            messages: {},
            invalid_class: "invalid", // class utilisé pour les inputs invalide
            valid_class: "valid", // class utilisé pour les inputs valid
            on_submit: true, // définit si l'on veut binder l'event submit
            popover: false, // définit si l'on veut activer les popover
            val_msg_label:true,
            popover_placement: "right", // positionnement des popover par defaut
            popover_on_select: true, // activer les popover sur les dropdown / select. Par defaut on met false pour éviter les glitchs visuel
            popover_on_radio: true, // activer les popover sur les  radio button. Par defaut on met false pour éviter les glitchs visuel
            popover_on_checkbox: true, // activer les popover sur les checkbox. Par defaut on met false pour éviter les glitchs visuel
            loading: true, // activer la functionnalité de JQuery.loading.js. Appeler lors des call ajax et des submits.
            required_label: true, // modifier les labels des champs requis
            required_placeholder: true, // rajouter le template : required_placeholder_content
            popover_trigger: "hover", // trigger de l'evenement des popovers par defaut
            required_label_content: '<span class="required"> *</span>', // template pour le label des champs requis
            required_placeholder_content: ' ( required )', // template pour le placeholder des champs requis
            autocomplete_message_template: '<span class="loading hidden" data-ninja-autocomplete-msg-for="{0}"><img class="loading-img" src="/Images/loading.ico" />&nbsp;<em>{1}</em></span> <span data-ninja-autocomplete-msg-for="{0}" class="txtErreur hidden">{2}</span>', // template des champs autocompletes
            ignore: "[data-ignore-input]", // input a ignorer lors des submits et validations
            autocomplete_min: 2, // longueur minimum des champs autocomplete
            enable_autocomplete: true, // activer les champs autocompletes
            datatables: [] // tableau pour DataTables
        },
        /*************************************************************************
        returns true if the form contains the atribute data-ninja-activated wich
        means the form has already been activated.
        **************************************************************************/
        isNinjaValidate: function (oItem) {
            //return $(oItem).data('ninjaValidator') !== undefined

            if ($(oItem).attr('data-ninja-activated')) {
                this.logMessage('Already activated !');
                return true;
            }
            else {
                return false;
            }
        },
        isTrue: function (value) {
            if (value === undefined) return false;
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true';
            }
            else if (typeof value === 'boolean') {
                return value;
            }
            else return false;
        },

        isFalse: function (value) {
            if (value === undefined) return false;
            if (typeof value === 'string') {
                return value.toLowerCase() === 'false';
            }
            else if (typeof value === 'boolean') {
                return !value;
            }
            else return false;
        },

        /********************************************************
        if debug true, right message in console.
        ********************************************************/
        logMessage: function (message) {
            if ($.ninjaValidator.isTrue(this.defaults.debug)) {
                console.log(message);
            }
        },
        /*********************************************************
        load the script to initiate validation on document.ready
        *********************************************************/
        loadScript: function () {

            //fin all data-val-ajax-form
            var ajaxValForms = $(this).find('form.data-val-ajax-form');
            for (var i = 0; i < ajaxValForms.length; i++) {
                var $ajaxValForm = $(ajaxValForms[i]);
                $ajaxValForm.ninjaAjaxForm();
            }

            //find all data-val-form
            var valForms = $(this).find('form.data-val-form');
            for (var i = 0; i < valForms.length; i++) {
                var $valForm = $(valForms[i]);
                $valForm.ninjaValidate({}, {});
            }

            //find all data-ninja-ajax
            var ajaxForms = $(this).find('[data-ninja-ajax]');
            for (var i = 0; i < ajaxForms.length; i++) {
                var $item = $(ajaxForms[i]);
                if ($.ninjaValidator.isTrue($item.attr('data-ninja-ajax'))) {
                    if (!$.ninjaValidator.isNinjaValidate($item)) {
                        var options = {
                            ajax: _fnLoadAjaxOptionsFromAttr($item),
                            settings: _fnLoadSettingsFromAttr($item),
                            messages: _fnLoadMessagesFromAttr($item)
                        };

                        $item.ninjaAjaxSubmit(options);
                    }
                }
            }

            //find all data-ninja-ajax button
            var ajaxButtons = $(this).find('[data-ninja-ajax-button]');
            for (var i = 0; i < ajaxButtons.length; i++) {
                var $button = $(ajaxButtons[i]);
                if ($.ninjaValidator.isTrue($button.attr('data-ninja-ajax-button'))) {
                    if (!$.ninjaValidator.isNinjaValidate($button)) {
                        var options = _fnLoadAjaxOptionsFromAttr($button);
                        $button.ninjaAjaxCall(options);
                    }
                }
            }
        },
        /*************************************
        set the defaults
        **************************************/
        setDefaults: function (oSettings) {
            $.extend($.ninjaValidator.defaults, oSettings);
        },
        /*************************************
        set the defaults messages
        ***************************************/
        setMessages: function (oMessages) {
            $.extend($.ninjaValidator.messages, oMessages);
        },
        /************************************************************************************************************************************************************************************
        *                                                                                           MESSAGES
        *************************************************************************************************************************************************************************************/
        messages: {
            select: "Select an option",
            checkbox: "Select at least one option",
            radiobutton: "Selection an option",
            autoCompleteFieldInfo: "This is an autocomplete field",
            required: "Field required.",
            postal_code: "Enter a valid postal code : H0H0H0, H0H 0H0.",
            phone_number: "Enter a valid phone number : EX : 450-555-5555, (450)-555-5555, 4505555555.",
            email: "Enter a valid email adress : EX : mon.nom@gmail.com.",
            password: "Password must contains at least 6 caracteres, 1 uppercase, 1 lowercase, 1 number.",
            equal_to: "Does not match.",
            positive_int: "Enter only digits.",
            negative_int: "Enter a negative digits",
            positive_number: "Must be a positive number",
            negative_number: "Must be a negative number",
            year: "Enter a valid year : 0001 a 9999",
            date: "Enter a valid date, EX : 2015-10-09 : yyyy-mm-dd ",
            date_iso: "Enter a valid date (ISO).",
            personnal_name: "Enter a valid name, EX : John, Doh!",
            fullname: "Enter a valid full name, EX : John Doh, Eddy-John Smith!",
            username: "Enter a valid username, minimum of 6 caracteres.",
            custom_validation: "Must comply to regex : {0}",
            int_max_value: "Enter an integer smaller or equal to {0}",
            int_min_value: "Enter an integer bigger or equal to {0}",
            number_max_value: "Enter a number smaller or equal to {0}",
            number_min_value: "Enter a number bigger or equal to {0}",
            string_max_length: "Must contains less than {0} caracters.",
            string_min_length: "Must contains more than {0} caracters.",
            number: "Enter a valid number.",
            creditcard: "Enter a valid credit card number.",
            range_length: "Must contains between {0} and {1} caracters.",
            range: "Must be between {0} and {1}.",
            max: "Must be smaller or equal to {0}.",
            min: "Must be bigger or equal to {0}.",
            url: "Enter a valid URL.",
            digits: "Enter only digits.",
            invalid: "Invalid field.",
            autocomplete_error: "Cannot find",
            autocomplete_loading: "Loading...",
            ajax_loading: "Loading...",
            ajax_thrown_error: "Ajax call error : {0}"
        },
        /************************************************************************************************************************************************************************************
        *                                                                                           PROTOTYPE
        *************************************************************************************************************************************************************************************/
        prototype: {
            /***************************************************
            initilize the form to be validate 
            **************************************************/
            init: function () {
                if ($.ninjaValidator.isNinjaValidate(this.currentForm)) {
                    return; // if the form has already been activated we do nothing
                }
                else {
                    //we use data-ninja-activated to indicate if the form has been activated
                    $(this.currentForm).attr('data-ninja-activated', 'true');
                }
                var validator = this;

                //on reset event
                $(this.currentForm).on('reset', function (event) {
                    validator.resetForm();
                });

                if ($.ninjaValidator.isTrue(this.settings.on_submit)) { //if we want to bind submit event
                    $(this.currentForm).submit(function (event) {
                        var action = $(document.activeElement).val();
                        switch (action.toLowerCase()) {
                            case "delete":
                            case "supprimer":
                            case "del":
                                //do nothing i guess. no need to validate anything
                                break;
                            case "edit":
                            case "modifier":
                                validator.submitForm(event);
                                break;
                            default:
                                validator.submitForm(event);
                                break;
                        }
                    });
                }

                if ($.ninjaValidator.isTrue(this.settings.enable_field_validation) && $.ninjaValidator.isTrue(this.settings.required_label)) {//settings.required_label :true if we want to add a star next to the label associated with any required field/input
                    var labels = $(this.currentForm).find('label[for]');
                    for (var index = 0; index < labels.length; index++) {
                        var label = labels[index];
                        var forid = $(labels[index]).attr('for');
                        var inputFor = $(this.currentForm).find('#' + forid)[0];
                        if (inputFor !== undefined && $(inputFor).attr('data-val-required') !== undefined) {
                            $(label).append(this.settings.required_label_content);
                        }
                        else {
                            var name = forid.replace('_', '.');
                            inputFor = $(this.currentForm).find('[name="' + name + '"]')[0];
                            if (inputFor !== undefined && $(inputFor).attr('data-val-required') !== undefined) {
                                $(label).append(this.settings.required_label_content);
                            }
                        }

                    }
                }

                var inputs = this.elements();

                for (var iInput = 0; iInput < inputs.length; iInput++) {
                    _fnInitInput($(inputs[iInput]), this);
                }
            },
            /************************
            performs a regular submit
            *************************/
            submitForm: function (event) {
                var validator = this;
                var hiddenInputs = [];
                //we check datatable function to make juste dataTable.js exist
                if ($.isFunction($.fn.DataTable)) {
                    if (validator.settings.datatables !== undefined && validator.settings.datatables.length > 0) {
                        for (var i = 0; i < validator.settings.datatables.length; i++) {
                            var table = validator.settings.datatables[0];

                            var hiddens = validator.getHiddenRows(table);

                            for (var j = 0; j < hiddens.length; j++) {
                                inputs = $(hiddens[j]).find("input, select, textarea").not(":submit, :reset, :image").not(validator.settings.ignore);
                                for (var k = 0; k < inputs.length; k++) {
                                    $input = $(inputs[0]);
                                    $input.attr('type', 'hidden');
                                    hiddenInputs.push($input);
                                    $(validator.currentForm).append($input);
                                }
                            }
                        }
                    }
                }

                if (!validator.isFormValid()) { //we validate the form and if its not valid, we prevent the submit
                    event.preventDefault();
                    //if form isnt valid, we clean up
                    for (var i = 0; i < hiddenInputs.length; i++) {
                        $(validator.currentForm).find($(hiddenInputs[i])).remove();
                    }
                }
                else if ($.ninjaValidator.isTrue(validator.settings.loading) && $.isFunction($.fn.loading)) { //if we wanna use the loading from jquery.loading.js
                    $('body').loading();
                }
            },

            /*****************************
            removes any validation from form
            *****************************/
            resetForm: function () {
                this.elements().removeClass(validator.settings.invalid_class).removeClass(validator.settings.valid_class);
            },

            /******************************************
            performs a call ajax
            *****************************************/
            submitWithAjax: function () {
                var validator = this;

                if (!validator.ajax.submit_action_value && validator.ajax.submit_action_value.length <= 0) validator.ajax.submit_action_value = $(document.activeElement).val();

                if (!validator.ajax.submit_action_value) submitAction = ""; //for default behavoir in case of 
                switch (validator.ajax.submit_action_value.toLowerCase()) {
                    case "delete":
                    case "supprimer":
                    case "del":
                        //do nothing i guess. no need to validate anything
                        break;
                    case "edit":
                    case "modifier":
                        if ($.ninjaValidator.isTrue(validator.ajax.validate_first) && !validator.isFormValid()) {
                            event.preventDefault();
                            return;
                        }
                        break;
                    default:
                        if ($.ninjaValidator.isTrue(validator.ajax.validate_first) && !validator.isFormValid()) {
                            event.preventDefault();
                            return;
                        }
                        break;
                }


                var formdata;
                var url = "";
                if (validator.ajax.data !== null && validator.ajax.data !== undefined && validator.ajax.data.length > 0) {
                    formdata = validator.ajax.data;
                }
                else {
                    formdata = new FormData();
                    var inputs = [];
                    //we check datatable function to make juste dataTable.js exist
                    if ($.isFunction($.fn.DataTable)) {
                        if (this.ajax.datatables !== undefined && validator.ajax.datatables.length > 0) {
                            for (var i = 0; i < validator.ajax.datatables.length; i++) {
                                var table = validator.ajax.datatables[0];
                                var hiddens = validator.getHiddenRows(table);
                                for (var j = 0; j < hiddens.length; j++) {
                                    inputs = $.merge(inputs, $(hiddens[j]).find("input, select, textarea").not(":submit, :reset, :image").not(validator.settings.ignore));
                                }
                            }
                        }
                    }


                    inputs = $.merge(inputs, validator.elements());

                    for (var i = 0; i < inputs.length; i++) {
                        var $input = $(inputs[i]);
                        var name = $input.attr('name');
                        if (name === undefined || name.length <= 0) name = $input.attr('id');
                        var value = "";
                        value = $input.val();
                        if ($input.is(':checkbox')) {
                            if ($input.is(':checked')) { //we only submit checked checkbox
                                formdata.append(name, value); //in your controller, the data can be retrive with a string.split
                            }
                        }
                        else {
                            if ($input.is('textarea')) value = $input.innerHTML; // in case of a textarea, the value is in the innerHTML
                            formdata.append(name, value);
                        }
                    }
                }
                //we append the Action to the formdata so you can play with it in the controller
                if (validator.ajax.submit_action_value) formdata.append('Action', validator.ajax.submit_action_value);
                //if ajax.url is set, it has a higher priority then ajax.action and ajax.controller
                if (validator.ajax.url && validator.ajax.url !== null && validator.ajax.url !== "") {
                    url = validator.ajax.url;
                } //otherwise, we'll build the url with ajax.controller and ajax.action
                else {
                    url += "/" + validator.ajax.controller + "/" + validator.ajax.action;
                }
                $('#' + validator.ajax.success_container).html($.ninjaValidator.format(validator.ajax.loading_template, validator.settings.messages.ajax_loading));
                $.ajax({
                    type: validator.ajax.type,
                    cache: validator.ajax.cache,
                    data: formdata,
                    processData: validator.ajax.processData,
                    contentType: validator.ajax.contentType,
                    url: url,
                    success: function (data) {
                        validator.ajax.success(data, validator.ajax.success_container);
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        if (validator.ajax.error_container && validator.ajax.error_container !== "") {
                            validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.error_container, validator.settings.messages.ajax_thrown_error);
                        }
                        else {
                            validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.success_container, validator.settings.messages.ajax_thrown_error);
                        }
                    }
                });
                if (validator.ajax.prevent_default) event.preventDefault();
            },


            /********************************
            return an array containing the hidden rows from a datatable
            ********************************/
            getHiddenRows: function (oTable) {
                var hiddens = [];
                if (oTable) {// if table exists
                    if (oTable.rows) {// with new API .DataTable()
                        hiddens = oTable.getHiddenRows();
                    }
                    else if (oTable.fnGetHiddenTrNodes) { // with old API .dataTable()
                        hiddens = oTable.fnGetHiddenTrNodes();
                    }
                    else if (oTable.fnGetHiddenNodes) { // with old API .dataTable()
                        hiddens = oTable.fnGetHiddenNodes();
                    }
                }
                return hiddens;
            },

            /***************************************************
            return all desired input of the current form
            **************************************************/
            elements: function () {
                var all = $(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image").not(this.settings.ignore);
                var nested = $(this.currentForm).find('[data-nested-form]').find("input, select, textarea").not(":submit, :reset, :image").not(this.settings.ignore);

                for (var i = 0; i < nested.length; i++) {
                    var iIndex = jQuery.inArray(nested[i], all);

                    if (iIndex != -1) {
                        all.splice(iIndex, 1);
                    }
                }
                return all;
            },
            /***************************************************
            Is use to show the input's popover if the input is valid or not
            **************************************************/
            showPopover: function (oInput) {
                if (oInput.hasClass(this.settings.invalid_class)) {
                    oInput.popover('show');
                }
                else {
                    oInput.popover('destroy');
                }
            },
            /***************************************************
            Validate the field (input) depending his type and his attributes
            return true or false 
            **************************************************/
            validateField: function (oInput) {
                validator = this;
                var IsValid = true;
                var IsEmpty = this.val_empty_field(oInput);
                var IsRequired = false;

                if (oInput.attr('data-val-required') !== undefined) {
                    IsValid = !IsEmpty;
                    IsRequired = true;
                }
                if (!IsRequired && IsEmpty) {
                    return IsValid; // true
                }
                else if (IsRequired && IsEmpty) {
                    return IsValid; // false
                }

                _fnLoadValidationFromAttr(oInput);

                $.each(oInput.ninja_validation, function (name, value) {

                    if (IsValid && name != 'val_required') IsValid = validator[name](oInput, value);
                })

                return IsValid;
            },
            /********************************************************************************
            Add valid or invalid class to the input depending on which the input is valid or not
            return true or false
            *******************************************************************************/
            addValidClass: function (isValid, oInput) {
                var validateFor = oInput.attr('data-val-for');
                if (isValid) {
                    if (validateFor) {
                        $('#' + validateFor).addClass(this.settings.valid_class);
                        $('#' + validateFor).removeClass(this.settings.invalid_class);
                    }
                    oInput.addClass(this.settings.valid_class);
                    oInput.removeClass(this.settings.invalid_class);
                    return true;
                } else {
                    if (validateFor) {
                        $('#' + validateFor).removeClass(this.settings.valid_class);
                        $('#' + validateFor).addClass(this.settings.invalid_class);
                    }
                    oInput.removeClass(this.settings.valid_class);
                    oInput.addClass(this.settings.invalid_class);
                    return false;
                }
            },
            /********************************************************************************
            Go though all the form and validate each field
            return true or false 
            *******************************************************************************/
            isFormValid: function () {
                var inputs = this.elements();
                var isValid = true;
                var focusSet = false;
                for (var iInput = 0; iInput < inputs.length; iInput++) {
                    var $input = $(inputs[iInput]);
                    var validate = $input.attr('data-validation');
                    if (validate !== undefined && $.ninjaValidator.isTrue(validate)) {
                        if (!this.addValidClass(this.validateField($input), $input)) {
                            isValid = false;
                            if (!focusSet) {
                                $input.focus();
                                focusSet = true;
                            }
                        }
                    }
                }
                return isValid;
            },

            //===================================================================================== Validation Function ===============================================================
            /**************************************************************************************************************************************************************************
            this section includes all necessary function to validate each inputs
            **************************************************************************************************************************************************************************/
            val_required: function (oInput) {
                return !this.val_empty_field(oInput);
            },
            val_select: function (oInput) {
                return validator.val_min_int_value(oInput, 1);
            },
            /***************************************************
            validate the group of radio button
            return true or false 
            **************************************************/
            val_radio_button: function (oInput) {
                var name = oInput.attr('name');
                var radios = $(this.currentForm).find('[name="' + name + '"]');
                for (var index = 0; index < radios.length; index++) {
                    if ($(radios[index]).is(':checked')) return true;
                }
                return false;
            },
            /***************************************************
            validate the checkbox and a group if needed
            return true or false
            **************************************************/
            val_checkbox: function (oInput) {
                var atLeast = oInput.attr('AtLeast');
                var group = oInput.attr('Group');
                var ifNot = oInput.attr('IfNot');
                var ifIs = oInput.attr('If');
                var IsValid = true;

                if (group !== undefined || group !== false) {
                    if (atLeast > 0) {
                        IsValid = false;
                        checkboxes = $(this.currentForm).find("input[Group='" + group + "']");
                        var count = 0;
                        for (var i = 0; i < checkboxes.length; i++) {
                            if ($(checkboxes[i]).is(':checked')) count++;
                            if (count == atLeast) {
                                IsValid = true;
                                break;
                            }
                        }
                    }
                }
                return IsValid;
            },
            val_credit_card: function (oInput) {
                var value = oInput.val();
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                nDigit = 0,
    	        bEven = false,
		        n, cDigit;

                value = value.replace(/\D/g, "");

                if (value.length < 13 || value.length > 19) {
                    return false;
                }

                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return (nCheck % 10) === 0;
            },
            val_date_iso: function (oInput) {
                return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(oInput.val())
            },
            val_number: function (oInput) {
                if (this.settings.number_with_comma) {
                    return (this.val_negative_number(oInput) || this.val_positive_number(oInput)); //Will accept both comma and dots separator : 1.23 == 1,23 => true
                }
                return !isNaN(parseFloat(oInput.val())) && isFinite(oInput.val()); //Wont accept comma separator : 1,23 => false, 1.23 => true
            },
            val_min_int_value: function (oInput, value) {
                return (parseInt(oInput.val()) >= parseInt(value));
            },
            val_max_int_value: function (oInput, value) {
                return (parseInt(oInput.val()) <= parseInt(value));
            },
            val_min_number_value: function (oInput, value) {
                return (parseFloat(oInput.val()) >= parseFloat(value));
            },
            val_max_number_value: function (oInput, value) {
                return (parseFloat(oInput.val()) <= parseFloat(value));
            },
            val_min_string_length: function (oInput, value) {
                return (oInput.val().length >= parseInt(value));
            },
            val_max_string_length: function (oInput, value) {
                return (oInput.val().length <= parseInt(value));
            },
            val_empty_field: function (oInput) {
                if (oInput.is(':checkbox') || oInput.is(':radio')) return !(oInput.is(':checked'));
                return oInput.val().length <= 0;
            },
            val_postal_code: function (oInput) { // For the moment, it will only works for Canadian postal code
                var regex = new RegExp("^[a-zA-Z][0-9][a-zA-Z](\\s{0,1})[0-9][a-zA-Z][0-9]$");
                return regex.test(oInput.val().trim());
            },
            val_phone_number: function (oInput) {
                var regex = new RegExp("^([\\(][0-9]{3}[\\)]|[0-9]{3})[\\-]{0,1}[0-9]{3}[\\-]{0,1}[0-9]{4}$");
                return regex.test(oInput.val().trim());
            },
            val_email: function (oInput) {
                var regex = new RegExp("^[\_]*([a-zA-Z0-9]+(\.|\_*)?)+@([a-zA-Z][a-zA-Z0-9\-]+(\.|\-*\.))+[a-zA-Z]{2,6}$");
                return regex.test(oInput.val().trim());
            },
            val_positive_int: function (oInput) {
                var regex = new RegExp("^[0-9]+$");
                return regex.test(oInput.val().trim());
            },
            val_negative_int: function (oInput) {
                var regex = new RegExp("^\\-[0-9]+$");
                return regex.test(oInput.val().trim());
            },
            val_positive_number: function (oInput) {
                if (this.settings.number_with_comma) {
                    var regex = new RegExp("^[0-9]+(\\.{0,1}||\\,{0,1})[0-9]+$"); //Will accept both comma and dot separator
                    return regex.test(oInput.val().trim());
                }
                return this.val_min_number_value(oInput, 0); //Wont accept comma separator 
            },
            val_negative_number: function (oInput) {
                if (this.settings.number_with_comma) {
                    var regex = new RegExp("^-[0-9]+(\\.{0,1}||\\,{0,1})[0-9]+$"); //Will accept both comma and dot separator
                    return regex.test(oInput.val().trim());
                }
                return this.val_max_number_value(oInput, 0); //Wont accept comma separator
            },
            val_year: function (oInput) {
                var regex = new RegExp("^(19|20)[0-9]{2}$");
                return regex.test(oInput.val().trim());
            },
            val_date: function (oInput) {
                var value = oInput.val();
                var isvalid = true;
                var sep = value.split(" ");

                if (sep.length == 1) { // which means theres only the date : 2015-10-12 
                    isvalid = !/Invalid|NaN/.test(new Date(sep[0]).toString());
                }
                else if (sep.length == 2) { // it incluse the time as well : 2015-10-12 12:12:12
                    isvalid = !/Invalid|NaN/.test(new Date(sep[0]).toString());
                    if (isvalid) {
                        var tabtime = sep[1].split(":");
                        //includes 23, 23:59, 23:59:59
                        var regex = new RegExp("^(?:2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$|^(?:2[0-3]|[01][0-9]):[0-5][0-9]$|^(?:2[0-3]|[01][0-9])");
                        isvalid = regex.test(sep[1]);
                    }
                }
                else isvalid = false;

                return isvalid;
            },
            val_personnal_name: function (oInput) {
                var regex = new RegExp("^[A-Z][a-z]{2,}((-|\\s)([A-Z][a-z]{2,})){0,4}$");
                return regex.test(oInput.val().trim());
            },
            val_fullname: function (oInput) {
                var regex = new RegExp("^([A-Z][a-z]{2,})(((-|\\s)([A-Z][a-z]{2,})){0,4})(((\\s)([A-Z][a-z]{2,})){1,4})$");
                return regex.test(oInput.val().trim());
            },
            val_username: function (oInput) {
                var regex = new RegExp("^[A-Za-z0-9_]{4,}$");
                return regex.test(oInput.val().trim());
            },
            val_password: function (oInput) {
                var regex = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/;
                return regex.test(oInput.val());
            },
            val_equal_to: function(oInput, value){
                var compare = $(this.currentForm).find('#' + value);
                if (compare !== undefined) {
                    return (oInput.val() == compare.val());
                }
                else return true;
            },
            val_confirmed_password: function (oInput) {
                var password = $(this.currentForm).find('[data-val-password]');
                return (oInput.val() == $(password).val());
            },
            val_custom_validation: function (oInput, value) {
                var regex = new RegExp(value);
                return regex.test(oInput.val().trim());
            },
            //========================================================================================== End of validation function ====================================================

            /***************************************************
            show the popover if the field is invalid
            **************************************************/
            activatePopover: function (oInput) {
                var validator = this;
                validator.addPopoverAttr(oInput); //add necessary attributes to the input to enable the popover

                oInput.popover({
                    placement: oInput.attr('data-placement'),
                    trigger: oInput.attr('data-trigger')
                })
                oInput.on('show.bs.popover', function (e) {
                    if (!$(this).hasClass(validator.settings.invalid_class)) {
                        e.preventDefault();
                    }
                });
            },
            /***************************************************
            add validation mesasge label above desired input
            **************************************************/
            addValMessageLabel: function (oInput){
                var validator = this;

                //we check if the label for this input has already been added
                var vallabel = $(this.form).find("label[validation-msg-for='" + this.id + "']");

                if (vallabel.length <= 0) {
                    //if it's doesn't exist yet, we'll create it
                    vallabel = $('<label>');
                    vallabel.attr('id', 'val_label_' + oInput.attr('id'));
                    vallabel.attr('validation-msg-for', oInput.attr('id'));
                    vallabel.addClass('validation');
                    var content = "";

                    if (oInput.ninja_validation.val_required !== undefined) {
                        if (oInput.ninja_validation_messages.val_required !== undefined) content += oInput.ninja_validation_messages.val_required;
                        else content += this.settings.messages.required + ' ';
                    }

                    vallabel.text(content += validator.getValidationMessageV2(oInput));

                    oInput.before(vallabel);
                }
                
                vallabel.hide();//finally, let's hide it.

                oInput.focusin(function () {
                    if ($(this).hasClass('invalid')) {
                        var lbl = $(this.form).find("label[validation-msg-for='" + this.id + "']")
                        if (lbl.length > 0) {
                            lbl.show();
                        }
                    }
                });

                oInput.focusout(function () {
                    var lbl = $(this.form).find("label[validation-msg-for='" + this.id + "']")
                    if (lbl.length > 0 ) {
                        lbl.hide();
                    }
                });

            },
            /***************************************************
            Add necessary attributes to add popover functionnality to the input. bootstrap is necessary
            return true or false 
            **************************************************/
            addPopoverAttr: function (oInput) {
                var validator = this;
                oInput.attr('data-toggle', 'popover');
                oInput.attr('data-trigger', 'focus');
                if (oInput.attr('data-placement') === undefined) {
                    oInput.attr('data-placement', this.settings.popover_placement);
                }
                var content = "";

                var valContent = oInput.attr('data-content');
                if (valContent !== undefined) {
                    content = valContent;
                    oInput.attr('data-content', content);
                    return;
                }

                var valRequiered = oInput.attr('data-val-required');

                if (oInput.ninja_validation.val_required !== undefined) {
                    if (oInput.ninja_validation_messages.val_required !== undefined) oInput.attr('title', oInput.ninja_validation_messages.val_required);
                    else oInput.attr('title', this.settings.messages.required);
                }
                else {
                    oInput.attr('title', this.settings.messages.invalid);
                }
                
                oInput.attr('data-content', content += validator.getValidationMessageV2(oInput));
            },

            getValidationMessageV2: function (oInput){
                var content = "";

                if (oInput.ninja_validation.val_number !== undefined) {
                    if (oInput.ninja_validation_messages.val_number !== undefined) content += oInput.ninja_validation_messages.val_number;
                    else content += this.settings.messages.number;
                }
                if (oInput.ninja_validation.val_postal_code !== undefined) {
                    if (oInput.ninja_validation_messages.val_postal_code !== undefined) content += oInput.ninja_validation_messages.val_postal_code;
                    else content += this.settings.messages.postal_code;
                }
                if (oInput.ninja_validation.val_phone_number !== undefined) {
                    if (oInput.ninja_validation_messages.val_phone_number !== undefined) content += oInput.ninja_validation_messages.val_phone_number;
                    else content += this.settings.messages.phone_number;
                }
                if (oInput.ninja_validation.val_email !== undefined) {
                    if (oInput.ninja_validation_messages.val_email !== undefined) content += oInput.ninja_validation_messages.val_email;
                    else content += this.settings.messages.email;
                }
                if (oInput.ninja_validation.val_password !== undefined) {
                    if (oInput.ninja_validation_messages.val_password !== undefined) content += oInput.ninja_validation_messages.val_password;
                    else content += this.settings.messages.password;
                }
                if (oInput.ninja_validation.val_equal_to !== undefined) {
                    if (oInput.ninja_validation_messages.val_equal_to !== undefined) content += oInput.ninja_validation_messages.val_equal_to;
                    else content += this.settings.messages.equal_to;
                }
                if (oInput.ninja_validation.val_confirmed_password !== undefined) {
                    if (oInput.ninja_validation_messages.val_confirmed_password !== undefined) content += oInput.ninja_validation_messages.val_confirmed_password;
                    else content += this.settings.messages.equal_to;
                }
                if (oInput.ninja_validation.val_positive_int !== undefined) {
                    if (oInput.ninja_validation_messages.val_positive_int !== undefined) content += oInput.ninja_validation_messages.val_positive_int;
                    else content += this.settings.messages.positive_int;
                }
                if (oInput.ninja_validation.val_negative_int !== undefined) {
                    if (oInput.ninja_validation_messages.val_negative_int !== undefined) content += oInput.ninja_validation_messages.val_negative_int;
                    else content += this.settings.messages.negative_int;
                }
                if (oInput.ninja_validation.val_positive_number !== undefined) {
                    if (oInput.ninja_validation_messages.val_positive_number !== undefined) content += oInput.ninja_validation_messages.val_positive_number;
                    else content += this.settings.messages.positive_number;
                }
                if (oInput.ninja_validation.val_negative_number !== undefined) {
                    if (oInput.ninja_validation_messages.val_negative_number !== undefined) content += oInput.ninja_validation_messages.val_negative_number;
                    else content += this.settings.messages.negative_number;
                }
                if (oInput.ninja_validation.val_year !== undefined) {
                    if (oInput.ninja_validation_messages.val_year !== undefined) content += oInput.ninja_validation_messages.val_year;
                    else content += this.settings.messages.year;
                }
                if (oInput.ninja_validation.val_date !== undefined) {
                    if (oInput.ninja_validation_messages.val_date !== undefined) content += oInput.ninja_validation_messages.val_date;
                    else content += this.settings.messages.date;
                }
                if (oInput.ninja_validation.val_personnal_name !== undefined) {
                    if (oInput.ninja_validation_messages.val_personnal_name !== undefined) content += oInput.ninja_validation_messages.val_personnal_name;
                    else content += this.settings.messages.personnal_name;
                }
                if (oInput.ninja_validation.val_fullname !== undefined) {
                    if (oInput.ninja_validation_messages.val_fullname !== undefined) content += oInput.ninja_validation_messages.val_fullname;
                    else content += this.settings.messages.fullname;
                }
                if (oInput.ninja_validation.val_username !== undefined) {
                    if (oInput.ninja_validation_messages.val_username !== undefined) content += oInput.ninja_validation_messages.val_username;
                    else content += this.settings.messages.username;
                }
                if (oInput.ninja_validation.val_custom_validation !== undefined) {
                    if (oInput.ninja_validation_messages.val_custom_validation !== undefined) content += oInput.ninja_validation_messages.val_username;
                    else content += content += $.ninjaValidator.format(this.settings.messages.custom_validation, oInput.ninja_validation.val_custom_validation);
                }
                if (oInput.ninja_validation.val_max_int_value !== undefined) {
                    if (oInput.ninja_validation_messages.val_max_int_value !== undefined) content += oInput.ninja_validation_messages.val_max_int_value;
                    else content += $.ninjaValidator.format(this.settings.messages.int_max_value, oInput.ninja_validation.val_max_int_value);
                }
                if (oInput.ninja_validation.val_min_int_value !== undefined) {
                    if (oInput.ninja_validation_messages.val_min_int_value !== undefined) content += oInput.ninja_validation_messages.val_min_int_value;
                    else content += $.ninjaValidator.format(this.settings.messages.int_min_value, oInput.ninja_validation.val_min_int_value);
                }
                if (oInput.ninja_validation.val_max_number_value !== undefined) {
                    if (oInput.ninja_validation_messages.val_max_number_value !== undefined) content += oInput.ninja_validation_messages.val_max_number_value;
                    else content += $.ninjaValidator.format(this.settings.messages.number_max_value, oInput.ninja_validation.val_max_number_value);
                }
                if (oInput.ninja_validation.val_min_number_value !== undefined) {
                    if (oInput.ninja_validation_messages.val_min_number_value !== undefined) content += oInput.ninja_validation_messages.val_min_number_value;
                    else content += $.ninjaValidator.format(this.settings.messages.number_min_value, oInput.ninja_validation.val_min_number_value);
                }
                if (oInput.ninja_validation.val_max_string_length !== undefined) {
                    if (oInput.ninja_validation_messages.val_max_string_length !== undefined) content += oInput.ninja_validation_messages.val_max_string_length;
                    else content += $.ninjaValidator.format(this.settings.messages.string_max_length, oInput.ninja_validation.val_max_string_length);
                }
                if (oInput.ninja_validation.val_min_string_length !== undefined) {
                    if (oInput.ninja_validation_messages.val_min_string_length !== undefined) content += oInput.ninja_validation_messages.val_min_string_length;
                    else content += $.ninjaValidator.format(this.settings.messages.string_min_length, oInput.ninja_validation.val_min_string_length);
                }

                return content;
            },
            
            /***************************************************
            Return validation message content from validation attribute
            **************************************************/
            getValidationMessage: function (oInput) {

                var content = "";

                if (oInput.ninja_validation.val_number !== undefined) {
                    if (oInput.ninja_validation.val_number !== "") content += oInput.ninja_validation.val_number;
                    else content += this.settings.messages.number;
                }
                if (oInput.ninja_validation.val_postal_code !== undefined) {
                    if (oInput.ninja_validation.val_postal_code !== "") content += oInput.ninja_validation.val_postal_code;
                    else content += this.settings.messages.postal_code;
                }
                if (oInput.ninja_validation.val_phone_number !== undefined) {
                    if (oInput.ninja_validation.val_phone_number !== "") content += oInput.ninja_validation.val_phone_number;
                    else content += this.settings.messages.phone_number;
                }
                if (oInput.ninja_validation.val_email !== undefined) {
                    if (oInput.ninja_validation.val_email !== "") content += oInput.ninja_validation.val_email;
                    else content += this.settings.messages.email;
                }
                if (oInput.ninja_validation.val_password !== undefined) {
                    if (oInput.ninja_validation.val_password !== "") content += oInput.ninja_validation.val_password;
                    else content += this.settings.messages.password;
                }
                if (oInput.ninja_validation.val_confirmed_password !== undefined) {
                    if (oInput.ninja_validation.val_confirmed_password !== "") content += oInput.ninja_validation.val_confirmed_password;
                    else content += this.settings.messages.equal_to;
                }
                if (oInput.ninja_validation.val_positive_int !== undefined) {
                    if (oInput.ninja_validation.val_positive_int !== "") content += oInput.ninja_validation.val_positive_int;
                    else content += this.settings.messages.positive_int;
                }
                if (oInput.ninja_validation.val_negative_int !== undefined) {
                    if (oInput.ninja_validation.val_negative_int !== "") content += oInput.ninja_validation.val_negative_int;
                    else content += this.settings.messages.negative_int;
                }
                if (oInput.ninja_validation.val_positive_number !== undefined) {
                    if (oInput.ninja_validation.val_positive_number !== "") content += oInput.ninja_validation.val_positive_number;
                    else content += this.settings.messages.positive_number;
                }
                if (oInput.ninja_validation.val_negative_number !== undefined) {
                    if (oInput.ninja_validation.val_negative_number !== "") content += oInput.ninja_validation.val_negative_number;
                    else content += this.settings.messages.negative_number;
                }
                if (oInput.ninja_validation.val_year !== undefined) {
                    if (oInput.ninja_validation.val_year !== "") content += oInput.ninja_validation.val_year;
                    else content += this.settings.messages.year;
                }
                if (oInput.ninja_validation.val_date !== undefined) {
                    if (oInput.ninja_validation.val_date !== "") content += oInput.ninja_validation.val_date;
                    else content += this.settings.messages.date;
                }
                if (oInput.ninja_validation.val_personnal_name !== undefined) {
                    if (oInput.ninja_validation.val_personnal_name !== "") content += oInput.ninja_validation.val_personnal_name;
                    else content += this.settings.messages.personnal_name;
                }
                if (oInput.ninja_validation.val_fullname !== undefined) {
                    if (oInput.ninja_validation.val_fullname !== "") content += oInput.ninja_validation.val_fullname;
                    else content += this.settings.messages.fullname;
                }
                if (oInput.ninja_validation.val_username !== undefined) {
                    if (oInput.ninja_validation.val_username !== "") content += oInput.ninja_validation.val_username;
                    else content += this.settings.messages.username;
                }

                if (oInput.ninja_validation.val_custom_validation !== undefined) content += $.ninjaValidator.format(this.settings.messages.custom_validation, oInput.ninja_validation.val_custom_validation);
                if (oInput.ninja_validation.val_max_int_value !== undefined) content += $.ninjaValidator.format(this.settings.messages.int_max_value, oInput.ninja_validation.val_max_int_value);
                if (oInput.ninja_validation.val_min_int_value !== undefined) content += $.ninjaValidator.format(this.settings.messages.int_min_value, oInput.ninja_validation.val_min_int_value);
                if (oInput.ninja_validation.val_max_number_value !== undefined) content += $.ninjaValidator.format(this.settings.messages.number_max_value, oInput.ninja_validation.val_max_number_value);
                if (oInput.ninja_validation.val_min_number_value !== undefined) content += $.ninjaValidator.format(this.settings.messages.number_min_value, oInput.ninja_validation.val_min_number_value);
                if (oInput.ninja_validation.val_max_string_length !== undefined) content += $.ninjaValidator.format(this.settings.messages.string_max_length, oInput.ninja_validation.val_max_string_length);
                if (oInput.ninja_validation.val_min_string_length !== undefined) content += $.ninjaValidator.format(this.settings.messages.string_min_length, oInput.ninja_validation.val_min_string_length);

                return content;
            },
            //===================================================================== autocomplete section ===============================================================
            /***************************************************
            Add autocomplete functionnality to the input
            **************************************************/
            autoComplete: function (oInput) {
                var validator = this;
                var value = oInput.val();
                var minimumLengthValue = oInput.attr('data-ninja-autocomplete-minlength');
                var inputFor = oInput.attr('data-ninja-autocomplete-for');
                var controller = oInput.attr('data-ninja-autocomplete-controller');
                var action = oInput.attr('data-ninja-autocomplete-action');
                var url = oInput.attr('data-ninja-autocomplete-url');
                if (url === undefined || url.length <= 0) {
                    url = "/" + controller + "/" + action;
                }

                if (minimumLengthValue === undefined || minimumLengthValue.length <= 0) minimumLengthValue = validator.settings.autocomplete_min;

                if (value !== undefined) {
                    if (value.length <= 0) {
                        validator.hideErrorMessage(oInput);
                        validator.hideLoadingMessage(oInput);
                    }
                    var formdata = new FormData();
                    var inputs = [];
                    if (oInput.parent().hasClass('input-group')) {
                        inputs = oInput.parent().find('input').not(oInput);
                    }
                    for (var i = 0; i < inputs.length; i++) {
                        var $input = $(inputs[i]);
                        var name = $input.attr('name');
                        if (name === undefined || name.length <= 0) name = $input.attr('id');
                        var textValue = "";
                        if ($input.is(':checkbox')) {
                            textValue = $input.is(':checked') ? "true" : "false";
                        }
                        else if ($input.is('textarea')) {
                            textValue = $input.innerHTML;
                        }
                        else {
                            textValue = $input.val();
                        }
                        formdata.append(name, textValue);
                    }
                    formdata.append("strText", value);

                    oInput.autocomplete({

                        minLength: minimumLengthValue,
                        source: function (request, response) {

                            // if ui-autocomplete isnt shown
                            if (!$('.ui-autocomplete.ui-widget:visible').length) {
                                // show loading icon
                                validator.showLoadingMessage(oInput);
                                validator.hideErrorMessage(oInput);
                            }
                            $.ajax({
                                type: 'POST',
                                cache: false,
                                processData: false,
                                contentType: false,
                                url: url,
                                data: formdata,
                                success: function (data) {
                                    if (data) {
                                        response(JSON.parse(data));
                                    }
                                    else {
                                        $(".ui-autocomplete").hide();
                                        validator.showErrorMessage(oInput);
                                    }
                                    validator.hideLoadingMessage(oInput);
                                },
                                error: function (jqXHR, textStatus, errorThrown) {
                                    $(".ui-autocomplete").hide();
                                    validator.showErrorMessage(oInput);
                                    validator.hideLoadingMessage(oInput);
                                }
                            });
                        },
                        select: function (e, ui) {
                            e.preventDefault();
                            if (inputFor !== undefined) {
                                $(validator.currentForm).find('#' + inputFor).val(ui.item.value);
                                $(validator.currentForm).find('#' + inputFor).trigger('change');
                            }
                            oInput.val(ui.item.label);
                            validator.hideErrorMessage(oInput);
                        },
                        change: function (e, ui) {
                            if (!ui.item) {
                                oInput.val('');
                                if (inputFor !== undefined) {
                                    $(validator.currentForm).find('#' + inputFor).val('');
                                    $(validator.currentForm).find('#' + inputFor).trigger('change');
                                }
                                validator.showErrorMessage(oInput);
                            }
                            else {
                                validator.hideErrorMessage(oInput);
                            }
                        }
                    });
                }
                else {
                    validator.hideErrorMessage(oInput);
                }
            },
            /***************************************************
            Show hidden error message
            **************************************************/
            showErrorMessage: function (oInput) {
                $(this.currentForm).find('.txtErreur[data-ninja-autocomplete-msg-for="' + oInput.attr('id') + '"]').removeClass('hidden');
            },
            /***************************************************
            Hide hidden error message
            **************************************************/
            hideErrorMessage: function (oInput) {
                $(this.currentForm).find('.txtErreur[data-ninja-autocomplete-msg-for="' + oInput.attr('id') + '"]').addClass('hidden');
            },
            /***************************************************
            Hide hidden loading message
            **************************************************/
            hideLoadingMessage: function (oInput) {
                $(this.currentForm).find('.loading[data-ninja-autocomplete-msg-for="' + oInput.attr('id') + '"]').addClass('hidden');
            },
            /***************************************************
            Hide hidden loading message
            **************************************************/
            showLoadingMessage: function (oInput) {
                $(this.currentForm).find('.loading[data-ninja-autocomplete-msg-for="' + oInput.attr('id') + '"]').removeClass('hidden');
            }
        }
    });

    /************************************************************************************************************************************************************************************
    *                                                                                           JQUERY PLUGIN FUNCTION
    *************************************************************************************************************************************************************************************/
    /*******************************************
    use this function to perform a submit with ajax
    if the 'form' you want to send isn't a form. Praticacle with
    'nested-form'
    *******************************************/
    $.fn.ninjaAjaxSubmit = function (options) {
        return this.each(function () {
            $this = $(this);
            if ($this.data('ninjaValidator') !== undefined || $.ninjaValidator.isNinjaValidate($this)) {
                return;
            }
            else {
                $this.attr('data-ninja-activated', 'true');
            }

            if (!options) options = {};

            if (options && options.ajax && options.ajax.form_container) {
                var validator = new $.ninjaValidator($this, $('#' + options.ajax.form_container), options.settings, options.messages, options.ajax);

                if (validator.ajax.initiate_validation) {
                    validator.settings.on_submit = false; // to prevent the default submit initiated by .init()
                    validator.init();
                }
                $this.attr('data-ninja-activated', 'true');

                $this.on(validator.ajax.trigger, function (event) {
                    validator.submitWithAjax();
                    if (validator.ajax.prevent_default) event.preventDefault();
                });
            }
            else {
                throw new Error('options.form_container cannot be undefined !');
                return false;
            }
            return validator;
        });
    };

    /**********************************************
    use this function to perform a simple ajax call to the controller
    with any input. For exemple, to delete a object use the data-ninja-ajax-url attribute
    like this <a href="javascript:void(0)" data-ninja-ajax-button="true" data-ninja-ajax-success_container="yourDivId" data-ninja-ajax-url="/Controller/Delete/6" > delete object </a>
    **********************************************/
    $.fn.ninjaAjaxCall = function (options) {
        $this = $(this);
        if ($this.data('ninjaValidator') !== undefined || $.ninjaValidator.isNinjaValidate($this)) {
            return;
        }
        else {
            $this.attr('data-ninja-activated', 'true');
        }
        var validator = new $.ninjaValidator($this, null, {}, {}, options);

        $this.on(validator.ajax.trigger, function (event) {
            if (validator.ajax.url && validator.ajax.url !== null && validator.ajax.url !== "") {
                url = validator.ajax.url;
            }
            else {
                url += "/" + validator.ajax.controller + "/" + validator.ajax.action;
            }
            $('#' + validator.ajax.success_container).html($.ninjaValidator.format(validator.ajax.loading_template, validator.settings.messages.ajax_loading));
            $.ajax({
                type: validator.ajax.type,
                cache: validator.ajax.cache,
                processData: validator.ajax.processData,
                contentType: validator.ajax.contentType,
                url: url,
                success: function (data) {
                    validator.ajax.success(data, validator.ajax.success_container);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    if (validator.ajax.error_container && validator.ajax.error_container !== "") {
                        validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.error_container, validator.settings.messages.ajax_thrown_error);
                    }
                    else {
                        validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.success_container, validator.settings.messages.ajax_thrown_error);
                    }
                }
            });
            if (validator.ajax.prevent_default) event.preventDefault();
            return validator;
        });
    };

    /**********************************************
    use this function to enable ninja validator on a specific form
    **********************************************/
    $.fn.ninjaValidate = function (oSettings, oMessages) {
        return this.each(function () {
            $this = $(this);
            if (!$this.is('form')) {
                throw new Error('Not a form !');
                return false;
            }

            if ($this.data('ninjaValidator') !== undefined || $.ninjaValidator.isNinjaValidate($this)) {
                return;
            }
            var validatorForm = new $.ninjaValidator($this, $this, oSettings, oMessages, {});
            validatorForm.init();
            return validatorForm;
        });
    };

    /**********************************************
    use to function to perform a quick check to see if a
    specific form is valid or not
    **********************************************/
    $.fn.ninjaIsValid = function (options) {
        return this.each(function () {
            $this = $(this);
            if (!$this.is('form')) {
                throw new Error('Not a form !');
                return false;
            }
            var validatorForm = new $.ninjaValidator(null, $this, options, {}, {}); // oCaller = null, because we just need it temporary and don't want to keep it.
            return validatorForm.isFormValid();
        });
    };

    /**********************************************
    use this function to transform a regular form to a form
    that uses ajax to submit itself

    $('#form').ninjaAjaxForm({
    settings:{
    loading: false,
    required_label_content: '<span class="required">*</span>'
    },
    ajax :{
    controller: 'controler',
    action: 'action',
    success_container: 'divsuccess',
    error_container: 'diverror'
    }
    });

    **********************************************/
    $.fn.ninjaAjaxForm = function (options) {
        var validators = [];
        this.each(function () {
            $this = $(this);
            if (!$this.is('form')) {
                throw new Error('Not a form !');
                return false;
            }
            if (!options) {
                options = {
                    ajax: _fnLoadAjaxOptionsFromAttr($this),
                    settings: _fnLoadSettingsFromAttr($this),
                    messages: _fnLoadMessagesFromAttr($this)
                };
                var urlaction = $this.attr('action');
                if ((!options.ajax.controller || !options.ajax.action) && !options.ajax.URL) {
                    if (!urlaction) {
                        valid = false;
                        this.logMessage('form : ' + $this.attr('id') + ' is missing some arguments');
                    }
                    options.ajax.url = urlaction;
                }
            }
            if ($this.data('ninjaValidator') !== undefined || $.ninjaValidator.isNinjaValidate($this)) {
                return $this.data('ninjaValidator');
            }
            if (!options) {
                this.logMessage('form ' + $this.attr('id') + ' is missings some arguments');
                return null;
            }

            var validator = new $.ninjaValidator($this, $this, options.settings, options.messages, options.ajax);

            if ($.ninjaValidator.isTrue(validator.ajax.initiate_validation)) {
                validator.settings.on_submit = false; //prevent regular submit validation
                validator.init();
            }
            else {
                $this.attr('data-ninja-activated', 'true');
            }

            $(validator.currentForm).on('submit', function (event) {
                validator.submitWithAjax();
                if (validator.ajax.prevent_default) event.preventDefault();
            });
            validators.push(validator);
        })
        return validators;
    };


    /************************************************************************************************************************************************************************************
    *                                                                                           DOC.READY
    *************************************************************************************************************************************************************************************/
    /***************************************************
    Go through all the form with the class data-val-form and initialize
    the validator for each one
    **************************************************/
    $(document).ready(function () {
        if ($.ninjaValidator.defaults.on_document_ready) { //We can prevent the document.ready by setting the default value to false
            $.ninjaValidator.loadScript();
        }
    });
} (jQuery));

/************************************************
Add a javascript function that basicaly does the same thing
as puttin the attribute data-ninja-ajax-button="true"
**************************************************/
function ninjaAjaxCall() {
    var $button = $(event.currentTarget);
    var options = _fnLoadAjaxOptionsFromAttr($button);
    var validator = new $.ninjaValidator($this, null, {}, {}, options);

    if (validator.ajax.url && validator.ajax.url !== null && validator.ajax.url !== "") {
        url = validator.ajax.url;
    }
    else {
        url += "/" + validator.ajax.controller + "/" + validator.ajax.action;
    }
    $('#' + validator.ajax.success_container).html($.ninjaValidator.format(validator.ajax.loading_template, validator.settings.messages.ajax_loading));
    $.ajax({
        type: validator.ajax.type,
        cache: validator.ajax.cache,
        processData: validator.ajax.processData,
        contentType: validator.ajax.contentType,
        url: url,
        success: function (data) {
            validator.ajax.success(data, validator.ajax.success_container);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            if (validator.ajax.error_container && validator.ajax.error_container !== "") {
                validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.error_container, validator.settings.messages.ajax_thrown_error);
            }
            else {
                validator.ajax.error(jqXHR, textStatus, errorThrown, validator.ajax.success_container, validator.settings.messages.ajax_thrown_error);
            }
        }
    });
    if (validator.ajax.prevent_default) event.preventDefault();
}

/************************************
use : var oTable = ('#exemple').DataTable();
var hiddens = oTable.getHiddenRows();
return an array containing the hidden rows of the datatable

this plugin is used in this .js but can also be use anywhere else as long
as you include this .js in your project
************************************/
if ($.isFunction($.fn.DataTable)) {
    $.fn.dataTable.Api.register('getHiddenRows()', function () {
        var nodes = this.rows().nodes();
        var displayed = jQuery('tbody tr', this.table().context[0].nTable);
        /* Remove nodes which are being displayed */
        for (var i = 0; i < displayed.length; i++) {
            var iIndex = jQuery.inArray(displayed[i], nodes);

            if (iIndex != -1) {
                nodes.splice(iIndex, 1);
            }
        }
        return nodes;
    });
}

//in case fnGetHiddenTrNodes.js isn't included, we are gonna load the script directly from datatables.net
if ($.isFunction($.fn.DataTable) && !$.isFunction($.fn.dataTableExt.oApi.fnGetHiddenTrNodes) && !$.isFunction($.fn.dataTableExt.oApi.fnGetHiddenNodes)) {
    $.getScript("//cdn.datatables.net/plug-ins/1.10.10/api/fnGetHiddenNodes.js");
}
/************************************
************************************/
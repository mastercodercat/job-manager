from django.contrib import admin

from job.models import Job, Skill


class RelatedInline(admin.TabularInline):
    model = Job.skills.through


class SkillAdmin(admin.ModelAdmin):
    inlines = [
        RelatedInline
    ]


class JobAdmin(admin.ModelAdmin):
    inlines = [
        RelatedInline
    ]
    exclude = ('skills',)


admin.site.register(Job, JobAdmin)
admin.site.register(Skill, SkillAdmin)
